import { Resend } from "resend";
import { createDownloadToken } from "./delivery";

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
  beatId: string;
};

export async function sendBeatDeliveryEmail({
  to,
  beatTitle,
  licenseName,
  beatId,
}: EmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const emailClient = getResend();
    if (!emailClient) {
      console.warn("RESEND_API_KEY not set, skipping email send");
      return { success: false, error: "Resend API key not configured" };
    }

    // Create download tokens for beat and license
    const beatToken = await createDownloadToken(beatId, to, "beat");
    const licenseToken = await createDownloadToken(beatId, to, "license");

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const beatDownloadUrl = `${siteUrl}/api/download/${beatToken}`;
    const licenseDownloadUrl = `${siteUrl}/api/download/${licenseToken}`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background: #030303;
      color: #fafafa;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      border-bottom: 1px solid rgba(255, 77, 0, 0.15);
      padding-bottom: 20px;
    }
    .logo {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 10px;
    }
    .logo-highlight {
      background: linear-gradient(135deg, #ff8a3d 0%, #ff4d00 50%, #ff2a2a 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .content {
      margin-bottom: 40px;
    }
    .title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 16px;
      line-height: 1.2;
    }
    .description {
      font-size: 16px;
      line-height: 1.6;
      color: #909090;
      margin-bottom: 24px;
    }
    .beat-info {
      background: rgba(255, 77, 0, 0.04);
      border: 1px solid rgba(255, 77, 0, 0.12);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .beat-label {
      font-size: 12px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #ff4d00;
      margin-bottom: 8px;
    }
    .beat-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .beat-license {
      font-size: 14px;
      color: #909090;
    }
    .downloads {
      display: flex;
      gap: 12px;
      flex-direction: column;
      margin-bottom: 32px;
    }
    .download-button {
      display: inline-block;
      background: linear-gradient(to right, #ff4d00, #ff2a2a);
      color: #000;
      text-decoration: none;
      padding: 14px 24px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 0.1em;
      text-align: center;
      text-transform: uppercase;
      box-shadow: 0 0 30px rgba(255, 77, 0, 0.35);
      transition: all 0.3s ease;
    }
    .download-button:hover {
      transform: scale(1.02);
    }
    .download-secondary {
      background: rgba(255, 77, 0, 0.1);
      color: #ff4d00;
      border: 1px solid rgba(255, 77, 0, 0.3);
      box-shadow: none;
    }
    .footer {
      border-top: 1px solid rgba(255, 77, 0, 0.15);
      padding-top: 24px;
      text-align: center;
      font-size: 13px;
      color: #737373;
    }
    .note {
      background: rgba(255, 77, 0, 0.05);
      border-left: 3px solid #ff4d00;
      padding: 12px 16px;
      margin-top: 24px;
      font-size: 12px;
      color: #909090;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        BEAT<span class="logo-highlight">PLATFORM</span>
      </div>
      <p style="margin: 0; color: #909090; font-size: 14px;">Premium Beat Marketplace</p>
    </div>

    <div class="content">
      <div class="title">Your beat purchase is ready</div>
      <div class="description">
        Thank you for your purchase! Your files are ready to download. Your download links will expire in 24 hours.
      </div>

      <div class="beat-info">
        <div class="beat-label">Purchase Details</div>
        <div class="beat-title">${beatTitle}</div>
        <div class="beat-license">License: ${licenseName}</div>
      </div>

      <div class="downloads">
        <a href="${beatDownloadUrl}" class="download-button">
          ↓ DOWNLOAD BEAT
        </a>
        <a href="${licenseDownloadUrl}" class="download-secondary download-button">
          ↓ DOWNLOAD LICENSE (PDF)
        </a>
      </div>

      <div class="note">
        <strong>⏱️ Important:</strong> Download links expire in 24 hours. Please save your files to a safe location immediately.
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0 0 12px 0;">
        Need help? Reply to this email or visit <strong>Zewone.music@gmail.com</strong>
      </p>
      <p style="margin: 0; color: #606060;">
        © ${new Date().getFullYear()} Beat Platform. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
`;

    const response = await emailClient.emails.send({
      from: "Beat Platform <onboarding@resend.dev>",
      to,
      subject: "Your beat purchase is ready",
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
