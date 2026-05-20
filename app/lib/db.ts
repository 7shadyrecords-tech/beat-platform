import crypto from "crypto";

// ---------------------------------------------------------------------------
// Upstash Redis REST client (no package — plain fetch)
// Env vars required: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
// If not set, all ops are no-ops and downloads are served without limits.
// ---------------------------------------------------------------------------

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export const MAX_DOWNLOADS = 3;
// TTL slightly longer than token expiry (24h) so records survive for auditing
const LOG_TTL_SECONDS = 30 * 24 * 60 * 60; // 30 days
const COUNT_TTL_SECONDS = 25 * 60 * 60;    // 25h

export type DownloadLog = {
  tokenHash: string;
  email: string;
  beatId: string;
  fileType: "beat" | "license";
  ip: string;
  userAgent: string;
  count: number;
  timestamp: string;
};

// Run multiple Redis commands in a single HTTP round-trip
async function pipeline(commands: unknown[][]): Promise<unknown[] | null> {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  try {
    const res = await fetch(`${REDIS_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
    });
    if (!res.ok) {
      console.error("Upstash pipeline error:", res.status, await res.text());
      return null;
    }
    const data = (await res.json()) as Array<{ result: unknown }>;
    return data.map((d) => d.result);
  } catch (err) {
    console.error("Upstash fetch error:", err);
    return null;
  }
}

// Stable short hash of the token used as Redis key prefix
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex").slice(0, 40);
}

// ---------------------------------------------------------------------------
// Atomically increment download count and check against MAX_DOWNLOADS.
// Returns { allowed, count }. Falls back to { allowed: true, count: 1 } if
// Redis is not configured (degraded mode — no limits enforced).
// ---------------------------------------------------------------------------
export async function checkAndIncrementDownload(
  tokenHash: string
): Promise<{ allowed: boolean; count: number }> {
  const countKey = `dl:count:${tokenHash}`;

  const results = await pipeline([
    ["INCR", countKey],
    ["EXPIRE", countKey, COUNT_TTL_SECONDS],
  ]);

  if (!results) {
    console.warn("[db] Upstash not configured — download limit not enforced");
    return { allowed: true, count: 1 };
  }

  const count = results[0] as number;
  return { allowed: count <= MAX_DOWNLOADS, count };
}

// ---------------------------------------------------------------------------
// Append a structured download log entry to a Redis list.
// Keeps the last 100 entries per token for audit purposes.
// ---------------------------------------------------------------------------
export async function logDownload(entry: DownloadLog): Promise<void> {
  const logKey = `dl:log:${entry.tokenHash}`;
  const value = JSON.stringify(entry);

  await pipeline([
    ["LPUSH", logKey, value],
    ["LTRIM", logKey, 0, 99],
    ["EXPIRE", logKey, LOG_TTL_SECONDS],
  ]);
}

// ---------------------------------------------------------------------------
// Exclusive licence: mark a beat as sold and check sale status.
// Key: exclusive:sold:{beatId} — persists permanently (no TTL).
// ---------------------------------------------------------------------------
export async function markExclusiveSold(beatId: string): Promise<void> {
  await pipeline([["SET", `exclusive:sold:${beatId}`, "1"]]);
}

export async function isExclusiveSold(beatId: string): Promise<boolean> {
  if (!REDIS_URL || !REDIS_TOKEN) return false;
  const results = await pipeline([["GET", `exclusive:sold:${beatId}`]]);
  if (!results) return false;
  return results[0] === "1";
}

// ---------------------------------------------------------------------------
// Read download logs for a token (for debugging / admin use)
// ---------------------------------------------------------------------------
export async function getDownloadLogs(tokenHash: string): Promise<DownloadLog[]> {
  if (!REDIS_URL || !REDIS_TOKEN) return [];
  const results = await pipeline([["LRANGE", `dl:log:${tokenHash}`, 0, -1]]);
  if (!results) return [];
  const raw = results[0] as string[];
  return raw.map((s) => {
    try { return JSON.parse(s) as DownloadLog; } catch { return null; }
  }).filter(Boolean) as DownloadLog[];
}
