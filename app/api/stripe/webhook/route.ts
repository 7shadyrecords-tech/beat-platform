import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/app/lib/stripe";
import { sendBeatDeliveryEmail } from "@/app/lib/resend";
import { markExclusiveSold } from "@/app/lib/db";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

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

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("[webhook] session.metadata:", JSON.stringify(session.metadata));

      const customerEmail = session.customer_details?.email;
      const beatTitle = session.metadata?.beatTitle;
      const beatId = session.metadata?.beatId;
      const licenseName = session.metadata?.licenseName;
      const licenseId = session.metadata?.licenseId;
      const audioFile = session.metadata?.audioFile || undefined;
      const wavFile = session.metadata?.wavFile || undefined;

      if (!customerEmail || !beatTitle || !beatId || !licenseName || !licenseId) {
        console.error("[webhook] Missing required metadata:", {
          customerEmail,
          beatTitle,
          beatId,
          licenseName,
          licenseId,
        });
        return NextResponse.json({ received: true, warning: "Missing metadata" });
      }

      const amountTotal = session.amount_total ?? 0;
      const currency = session.currency ?? "eur";

      // Mark exclusive beat as sold (before email so status is accurate)
      if (licenseId === "exclusive") {
        try {
          await markExclusiveSold(beatId);
          console.log(`[webhook] beat ${beatId} marked as exclusive sold`);
        } catch (err) {
          console.error("[webhook] Failed to mark exclusive sold:", err);
        }
      }

      try {
        const emailResult = await sendBeatDeliveryEmail({
          to: customerEmail,
          beatTitle,
          licenseName,
          licenseId,
          beatId,
          audioFile,
          wavFile,
          amountTotal,
          currency,
        });

        if (emailResult.success) {
          console.log("[webhook] Email sent, messageId:", emailResult.messageId);
        } else {
          console.error("[webhook] Email send failed:", emailResult.error);
        }
      } catch (emailError) {
        console.error("[webhook] Unexpected error sending email:", emailError);
      }

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
