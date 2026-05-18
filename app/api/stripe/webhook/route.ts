import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/app/lib/stripe";
import { sendBeatDeliveryEmail } from "@/app/lib/resend";
import { promises as fs } from "fs";
import path from "path";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const PROCESSED_PAYMENTS_FILE = path.join(
  process.cwd(),
  "storage/temp/processed-payments.json"
);

async function isPaymentProcessed(sessionId: string): Promise<boolean> {
  try {
    const data = await fs.readFile(PROCESSED_PAYMENTS_FILE, "utf-8");
    const payments = JSON.parse(data) as Record<string, number>;
    return !!payments[sessionId];
  } catch {
    return false;
  }
}

async function markPaymentProcessed(sessionId: string) {
  try {
    let payments: Record<string, number> = {};
    try {
      const data = await fs.readFile(PROCESSED_PAYMENTS_FILE, "utf-8");
      payments = JSON.parse(data);
    } catch {
      // File doesn't exist yet
    }
    payments[sessionId] = Date.now();
    await fs.writeFile(
      PROCESSED_PAYMENTS_FILE,
      JSON.stringify(payments, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error marking payment as processed:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is not configured");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe signature" },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
      console.error("Webhook signature verification failed:", error);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Prevent duplicate processing
      if (await isPaymentProcessed(session.id)) {
        console.log(`Payment ${session.id} already processed, skipping`);
        return NextResponse.json({ received: true });
      }

      const customerId = session.customer_details?.email;
      const beatTitle = session.metadata?.beatTitle;
      const beatId = session.metadata?.beatId;
      const licenseName = session.metadata?.licenseName;

      if (!customerId || !beatTitle || !beatId || !licenseName) {
        console.error("Missing required metadata in session:", {
          customerId,
          beatTitle,
          beatId,
          licenseName,
        });
        // Still mark as processed to avoid retry loops
        await markPaymentProcessed(session.id);
        return NextResponse.json({
          received: true,
          warning: "Missing metadata",
        });
      }

      // Send delivery email
      try {
        const emailResult = await sendBeatDeliveryEmail({
          to: customerId,
          beatTitle,
          licenseName,
          beatId,
        });

        console.log("Email delivery result:", emailResult);
      } catch (emailError) {
        console.error("Error sending delivery email:", emailError);
        // Don't fail the webhook, still mark as processed
      }

      // Mark payment as processed
      await markPaymentProcessed(session.id);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Webhook processing failed",
      },
      { status: 500 }
    );
  }
}
