import { NextRequest, NextResponse } from "next/server";
import { verifyDownloadToken, getBeatFile, getLicenseFile } from "@/app/lib/delivery";
import {
  checkAndIncrementDownload,
  logDownload,
  hashToken,
  MAX_DOWNLOADS,
} from "@/app/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json({ error: "Download token required" }, { status: 400 });
    }

    // 1. Verify HMAC signature + expiration (email is baked into the token)
    const tokenData = verifyDownloadToken(token);
    if (!tokenData) {
      return NextResponse.json(
        { error: "Lien de téléchargement invalide ou expiré." },
        { status: 404 }
      );
    }

    // 2. Check download count — 3 max per purchase
    const tokenHash = hashToken(token);
    const { allowed, count } = await checkAndIncrementDownload(tokenHash);

    if (!allowed) {
      return NextResponse.json(
        {
          error: `Limite atteinte : ce lien autorise ${MAX_DOWNLOADS} téléchargements maximum.`,
          downloads: count - 1,
          max: MAX_DOWNLOADS,
        },
        { status: 429 }
      );
    }

    // 3. Resolve file
    let fileBuffer: Buffer | null = null;
    let fileName = "";
    let contentType = "";

    if (tokenData.fileType === "beat") {
      fileBuffer = await getBeatFile(tokenData.beatId, tokenData.audioFile);
      fileName = `beat-${tokenData.beatId}.mp3`;
      contentType = "audio/mpeg";
    } else if (tokenData.fileType === "license") {
      fileBuffer = await getLicenseFile(tokenData.licenseId);
      fileName = `license-${tokenData.licenseId}.pdf`;
      contentType = "application/pdf";
    }

    if (!fileBuffer) {
      return NextResponse.json({ error: "Fichier introuvable." }, { status: 404 });
    }

    // 4. Log download (fire-and-forget — don't block the response)
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    logDownload({
      tokenHash,
      email: tokenData.email,
      beatId: tokenData.beatId,
      fileType: tokenData.fileType,
      ip,
      userAgent: request.headers.get("user-agent") ?? "",
      count,
      timestamp: new Date().toISOString(),
    }).catch((err) => console.error("[logDownload] failed:", err));

    // 5. Serve file
    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "X-Download-Count": String(count),
        "X-Download-Max": String(MAX_DOWNLOADS),
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Échec du téléchargement." },
      { status: 500 }
    );
  }
}
