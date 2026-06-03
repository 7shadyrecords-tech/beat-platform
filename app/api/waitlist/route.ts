import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: unknown;
      source?: unknown;
    };

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const source = typeof body.source === "string" ? body.source : "unknown";

    if (!email || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // TODO: Connect this extension point to a real waitlist provider.
    // Suggested options: Resend Audiences, Mailchimp, Supabase, or a CRM webhook
    // stored in a server-only env var. Do not send sensitive data through URLs.
    void source;

    return NextResponse.json(
      { ok: true, stored: false, message: "Waitlist provider not connected yet." },
      { status: 202 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid waitlist request." },
      { status: 400 }
    );
  }
}
