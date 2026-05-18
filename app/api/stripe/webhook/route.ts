import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
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
  console.log(`[webhook] POST /api/stripe/webhook received`);
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

    console.log(`[webhook] event received: ${event.type}`);

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Prevent duplicate processing
      if (await isPaymentProcessed(session.id)) {
        console.log(`Payment ${session.id} already processed, skipping`);
        return NextResponse.json({ received: true });
      }

      console.log("[webhook] session.metadata:", JSON.stringify(session.metadata));

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

      const amountTotal = session.amount_total ?? 0;
      const currency = session.currency ?? "usd";

      // Send delivery email
      try {
        const emailResult = await sendBeatDeliveryEmail({
          to: customerId,
          beatTitle,
          licenseName,
          beatId,
          amountTotal,
          currency,
        });

        console.log("Email delivery result:", emailResult);
      } catch (emailError) {
        console.error("Error sending delivery email:", emailError);
        // Don't fail the webhook, still mark as processed
      }

      // Mark payment as processed
      await markPaymentProcessed(session.id);
      console.log(`[webhook] session ${session.id} processed successfully`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error("[webhook] UNHANDLED ERROR");
    console.error("[webhook] message:", message);
    console.error("[webhook] stack:", stack);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
