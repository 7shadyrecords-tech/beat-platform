import { NextRequest, NextResponse } from "next/server";
import { verifyDownloadToken, getBeatFile, getLicenseFile } from "@/app/lib/delivery";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        { error: "Download token required" },
        { status: 400 }
      );
    }

    // Verify token validity and expiration
    const tokenData = await verifyDownloadToken(token);
    if (!tokenData) {
      return NextResponse.json(
        { error: "Invalid or expired download link" },
        { status: 404 }
      );
    }

    let fileBuffer: Buffer | null = null;
    let fileName: string = "";
    let contentType: string = "";

    if (tokenData.fileType === "beat") {
      fileBuffer = await getBeatFile(tokenData.beatId);
      fileName = `beat-${tokenData.beatId}.mp3`;
      contentType = "audio/mpeg";
    } else if (tokenData.fileType === "license") {
      fileBuffer = await getLicenseFile(tokenData.licenseId);
      fileName = `license-${tokenData.licenseId}.pdf`;
      contentType = "application/pdf";
    }

    if (!fileBuffer) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    // Return file with proper headers
    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Download failed",
      },
      { status: 500 }
    );
  }
}
