import { Resend } from "resend";
import { createDownloadToken } from "./delivery";
import { contactEmail, contactMailto } from "./contact";

let resend: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export type EmailPayload = {
  to: string;
  beatTitle: string;
  licenseName: string;
  licenseId: string;
  beatId: string;
  audioFile?: string;
  wavFile?: string;
  amountTotal: number;
  currency: string;
};

function formatPrice(amountInCents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountInCents / 100);
}

const WAV_LICENSES = new Set(["wav-lease", "premium-lease", "exclusive"]);

export async function sendBeatDeliveryEmail({
  to,
  beatTitle,
  licenseName,
  licenseId,
  beatId,
  audioFile,
  wavFile,
  amountTotal,
  currency,
}: EmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const emailClient = getResend();
    if (!emailClient) {
      console.warn("RESEND_API_KEY not set, skipping email send");
      return { success: false, error: "Resend API key not configured" };
    }

    // WAV/Premium/Exclusive → deliver WAV file if available, else fall back to MP3
    const isWavLicense = WAV_LICENSES.has(licenseId);
    const beatAudioFile = isWavLicense ? (wavFile ?? audioFile) : audioFile;
    const beatFileLabel = isWavLicense && wavFile ? "WAV" : "MP3";

    const beatToken = createDownloadToken(beatId, to, "beat", licenseId, beatAudioFile);
    const licenseToken = createDownloadToken(beatId, to, "license", licenseId, beatAudioFile);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const beatDownloadUrl = `${siteUrl}/api/download/${beatToken}`;
    const licenseDownloadUrl = `${siteUrl}/api/download/${licenseToken}`;
    const price = formatPrice(amountTotal, currency);

    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; background: #0a0a0a; color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 48px 24px; }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: #f5f5f5; margin-bottom: 24px; }
    .logo span { color: #ff4d00; }
    .badge { display: inline-block; background: rgba(255, 77, 0, 0.12); border: 1px solid rgba(255, 77, 0, 0.3); color: #ff4d00; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; padding: 5px 12px; border-radius: 20px; }
    .heading { font-size: 26px; font-weight: 700; margin: 20px 0 8px; line-height: 1.25; }
    .subheading { font-size: 15px; color: #737373; margin: 0 0 36px; }
    .card { background: #141414; border: 1px solid #222; border-radius: 12px; padding: 24px; margin-bottom: 24px; }
    .card-label { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #555; margin-bottom: 16px; }
    .beat-row { display: flex; justify-content: space-between; align-items: flex-start; }
    .beat-name { font-size: 20px; font-weight: 700; color: #f5f5f5; margin: 0 0 6px; }
    .beat-license { font-size: 13px; color: #737373; }
    .beat-price { font-size: 22px; font-weight: 800; color: #ff4d00; white-space: nowrap; margin-left: 16px; }
    .divider { border: none; border-top: 1px solid #1f1f1f; margin: 20px 0; }
    .btn { display: block; text-align: center; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 10px; }
    .btn-primary { background: #ff4d00; color: #fff; }
    .btn-secondary { background: transparent; color: #ff4d00; border: 1px solid rgba(255, 77, 0, 0.35); }
    .notice { background: #111; border-left: 3px solid #ff4d00; border-radius: 0 6px 6px 0; padding: 12px 16px; font-size: 12px; color: #737373; line-height: 1.5; }
    .notice strong { color: #f5f5f5; }
    .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #444; border-top: 1px solid #1a1a1a; padding-top: 32px; }
    .footer a { color: #737373; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">ZewOne <span>Beats</span></div>
      <div class="badge">Achat confirmé</div>
      <div class="heading">Vos fichiers sont prêts</div>
      <p class="subheading">Merci pour votre achat. Téléchargez vos fichiers ci-dessous avant l'expiration des liens.</p>
    </div>

    <div class="card">
      <div class="card-label">Récapitulatif de commande</div>
      <div class="beat-row">
        <div>
          <div class="beat-name">${beatTitle}</div>
          <div class="beat-license">Licence ${licenseName}</div>
        </div>
        <div class="beat-price">${price}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-label">Téléchargements</div>
      <a href="${beatDownloadUrl}" class="btn btn-primary">Télécharger le beat (${beatFileLabel})</a>
      <a href="${licenseDownloadUrl}" class="btn btn-secondary">Télécharger la licence (PDF)</a>
      <hr class="divider" />
      <div class="notice">
        <strong>Les liens expirent dans 24 heures.</strong> Enregistrez vos fichiers immédiatement. Si un lien expire, répondez à cet e-mail pour en obtenir un nouveau.
      </div>
    </div>

    <div class="footer">
      <p>Des questions ? <a href="${contactMailto}">${contactEmail}</a></p>
      <p style="margin: 8px 0 0; color: #333;">&copy; ${new Date().getFullYear()} ZewOne Beats</p>
    </div>
  </div>
</body>
</html>
`;

    const response = await emailClient.emails.send({
      from: "ZewOne Beats <no-reply@zewonebeats.com>",
      to,
      subject: `Achat confirmé – ${beatTitle}`,
      html: htmlContent,
    });

    if (response.error) {
      console.error("Resend email error:", response.error);
      return { success: false, error: response.error.message };
    }

    return { success: true, messageId: response.data?.id };
  } catch (error) {
    console.error("Email delivery error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}
