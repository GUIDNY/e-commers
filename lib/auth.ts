import "server-only";

const COOKIE_NAME = "campeasy_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

async function hmacSign(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Buffer.from(signature).toString("base64url");
}

export async function createSessionToken(): Promise<string> {
  const payload = `admin:${Date.now() + SESSION_MAX_AGE_SECONDS * 1000}`;
  const signature = await hmacSign(payload);
  return `${Buffer.from(payload).toString("base64url")}.${signature}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return false;
  const payload = Buffer.from(payloadB64, "base64url").toString("utf8");
  const expectedSignature = await hmacSign(payload);
  if (expectedSignature !== signature) return false;
  const expiry = Number(payload.split(":")[1]);
  return Number.isFinite(expiry) && Date.now() < expiry;
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && password === expected;
}

export { COOKIE_NAME };
