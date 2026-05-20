import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type DownloadToken = {
  beatId: string;
  email: string;
  fileType: "beat" | "license";
  licenseId: string;
  expiresAt: number;
  audioFile?: string;
};

const TOKEN_EXPIRES_IN_MS = 24 * 60 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!secret) throw new Error("DOWNLOAD_TOKEN_SECRET is not set");
  return secret;
}

function b64url(str: string): string {
  return Buffer.from(str).toString("base64url");
}

export function createDownloadToken(
  beatId: string,
  email: string,
  fileType: "beat" | "license",
  licenseId: string,
  audioFile?: string
): string {
  const payload = b64url(JSON.stringify({
    beatId,
    email,
    fileType,
    licenseId,
    audioFile,
    expiresAt: Date.now() + TOKEN_EXPIRES_IN_MS,
  }));
  const sig = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyDownloadToken(token: string): DownloadToken | null {
  try {
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return null;

    const expected = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
    if (!crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))) {
      return null;
    }

    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as DownloadToken;
    if (data.expiresAt < Date.now()) return null;

    return data;
  } catch {
    return null;
  }
}

const LICENSE_FILES: Record<string, string> = {
  "mp3-lease": "mp3-lease.pdf",
  "wav-lease": "wav-lease.pdf",
  "premium-lease": "premium-lease.pdf",
  "exclusive": "exclusive-license.pdf",
};

export async function getBeatFile(beatId: string, audioFile?: string): Promise<Buffer | null> {
  try {
    const filename = audioFile ?? `${beatId}.mp3`;
    return await fs.readFile(path.join(process.cwd(), `storage/beats/${filename}`));
  } catch {
    return null;
  }
}

export async function getLicenseFile(licenseId: string): Promise<Buffer | null> {
  try {
    const filename = LICENSE_FILES[licenseId] ?? "mp3-lease.pdf";
    return await fs.readFile(path.join(process.cwd(), `storage/licenses/${filename}`));
  } catch {
    return null;
  }
}
