import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type DownloadToken = {
  token: string;
  beatId: string;
  email: string;
  expiresAt: number;
  fileType: "beat" | "license";
};

const TOKENS_FILE = path.join(process.cwd(), "storage/temp/tokens.json");
const TOKEN_EXPIRES_IN_MS = 24 * 60 * 60 * 1000; // 24 hours

async function readTokens(): Promise<Map<string, DownloadToken>> {
  try {
    const data = await fs.readFile(TOKENS_FILE, "utf-8");
    const tokens = JSON.parse(data) as Record<string, DownloadToken>;
    return new Map(Object.entries(tokens));
  } catch {
    return new Map();
  }
}

async function writeTokens(tokens: Map<string, DownloadToken>) {
  const data = Object.fromEntries(tokens);
  await fs.writeFile(TOKENS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function createDownloadToken(
  beatId: string,
  email: string,
  fileType: "beat" | "license"
): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + TOKEN_EXPIRES_IN_MS;

  const tokens = await readTokens();
  tokens.set(token, {
    token,
    beatId,
    email,
    expiresAt,
    fileType,
  });

  await writeTokens(tokens);
  return token;
}

export async function verifyDownloadToken(
  token: string
): Promise<DownloadToken | null> {
  const tokens = await readTokens();
  const tokenData = tokens.get(token);

  if (!tokenData) {
    return null;
  }

  // Check expiration
  if (tokenData.expiresAt < Date.now()) {
    tokens.delete(token);
    await writeTokens(tokens);
    return null;
  }

  return tokenData;
}

export async function consumeDownloadToken(token: string) {
  const tokens = await readTokens();
  tokens.delete(token);
  await writeTokens(tokens);
}

export async function getBeatFile(beatId: string): Promise<Buffer | null> {
  try {
    const beatPath = path.join(
      process.cwd(),
      `storage/beats/${beatId}.mp3`
    );
    return await fs.readFile(beatPath);
  } catch {
    return null;
  }
}

export async function getLicenseFile(beatId: string): Promise<Buffer | null> {
  try {
    const licensePath = path.join(
      process.cwd(),
      `storage/licenses/${beatId}.pdf`
    );
    return await fs.readFile(licensePath);
  } catch {
    return null;
  }
}

// Clean up expired tokens periodically
export async function cleanupExpiredTokens() {
  const tokens = await readTokens();
  const now = Date.now();
  let cleaned = 0;

  for (const [token, data] of tokens.entries()) {
    if (data.expiresAt < now) {
      tokens.delete(token);
      cleaned++;
    }
  }

  if (cleaned > 0) {
    await writeTokens(tokens);
  }

  return cleaned;
}
