import { NextResponse } from "next/server";
import { getBeatById } from "@/app/lib/beats";
import { getLicense } from "@/app/data/licenses";
import { getSiteUrl, getStripe } from "@/app/lib/stripe";
import { isExclusiveSold } from "@/app/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { beatId, licenseId } = body as {
      beatId?: string;
      licenseId?: string;
    };

    if (!beatId || !licenseId) {
      return NextResponse.json(
        { error: "beatId and licenseId are required" },
        { status: 400 }
      );
    }

    const beat = getBeatById(beatId);
    if (!beat) {
      return NextResponse.json({ error: "Beat not found" }, { status: 404 });
    }

    const license = getLicense(licenseId);
    if (!license) {
      return NextResponse.json({ error: "Invalid license" }, { status: 400 });
    }

    // Block exclusive re-purchase
    if (licenseId === "exclusive") {
      const sold = await isExclusiveSold(beat.id);
      if (sold) {
        return NextResponse.json(
          { error: "Ce beat est déjà vendu en exclusivité et n'est plus disponible." },
          { status: 409 }
        );
      }
    }

    const siteUrl = getSiteUrl();
    const stripe = getStripe();

    const coverImages =
      !beat.coverImage.endsWith(".svg")
        ? [
            beat.coverImage.startsWith("http")
              ? beat.coverImage
              : `${siteUrl}${beat.coverImage}`,
          ]
        : undefined;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "link"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: license.priceCents,
            product_data: {
              name: `${beat.title} — ${license.name}`,
              description: `${beat.producer} · ${beat.bpm} BPM · ${beat.key}`,
              ...(coverImages ? { images: coverImages } : {}),
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        beatId: beat.id,
        beatTitle: beat.title,
        licenseId: license.id,
        licenseName: license.name,
        ...(beat.audioFile ? { audioFile: beat.audioFile } : {}),
        ...(beat.wavFile ? { wavFile: beat.wavFile } : {}),
      },
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    const message =
      err instanceof Error ? err.message : "Checkout session failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
