import "server-only";

/**
 * Server-only client for the CJdropshipping Open API (v2.0).
 * Docs: https://developers.cjdropshipping.com/
 *
 * Credentials are read from environment variables only - never hardcode
 * keys here and never import this module from client components.
 *
 * Auth: CJ's getAccessToken endpoint takes a single "apiKey" field - the full
 * "<userNum>@api@<secret>" string CJ hands out on the "Get API Key" page,
 * sent as-is (NOT split into email/password - that's a different, legacy
 * auth mode this API does not accept and returns a misleading "email or
 * password is wrong" error for).
 */

const BASE_URL = "https://developers.cjdropshipping.com/api2.0/v1";

function resolveApiKey(): string | null {
  return process.env.CJ_API_KEY_RAW || null;
}

interface TokenCache {
  accessToken: string;
  expiresAt: number; // epoch ms
}

// In-memory cache; fine for a single server process. Swap for a shared
// cache (KV/Redis) if you deploy to a multi-instance serverless setup.
let tokenCache: TokenCache | null = null;

async function fetchJson<T>(url: string, init: RequestInit, timeoutMs = 10000): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    if (!res.ok) {
      throw new Error(`CJ API HTTP ${res.status}`);
    }
    const json = (await res.json()) as T;
    return json;
  } finally {
    clearTimeout(timer);
  }
}

interface CjAuthResponse {
  code: number;
  result: boolean;
  message: string;
  data?: {
    accessToken: string;
    accessTokenExpiryDate: string;
    refreshToken: string;
    refreshTokenExpiryDate: string;
  };
}

async function getAccessToken(): Promise<string | null> {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.accessToken;
  }

  const apiKey = resolveApiKey();
  if (!apiKey) return null;

  try {
    const json = await fetchJson<CjAuthResponse>(`${BASE_URL}/authentication/getAccessToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
    });

    if (!json.result || !json.data) return null;

    tokenCache = {
      accessToken: json.data.accessToken,
      expiresAt: new Date(json.data.accessTokenExpiryDate).getTime(),
    };
    return tokenCache.accessToken;
  } catch {
    // Network unreachable, invalid credentials, etc. Caller falls back to seed data.
    return null;
  }
}

export interface CjProduct {
  pid: string;
  productNameEn: string;
  productImage: string;
  sellPrice: string; // CJ's cost price, as a string like "12.50-15.30"
  categoryName?: string;
}

interface CjListResponse {
  code: number;
  result: boolean;
  data?: { list: CjProduct[]; total: number };
}

/**
 * Search CJ's live catalog for camping-related products.
 * Returns null (never throws) if CJ is unreachable or unconfigured, so callers
 * can fall back to the local curated catalog.
 */
export async function searchCjProducts(keyword: string, pageSize = 20): Promise<CjProduct[] | null> {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const params = new URLSearchParams({
      productNameEn: keyword,
      pageNum: "1",
      pageSize: String(pageSize),
    });
    const json = await fetchJson<CjListResponse>(`${BASE_URL}/product/list?${params.toString()}`, {
      method: "GET",
      headers: { "CJ-Access-Token": token },
    });
    if (!json.result || !json.data) return null;
    return json.data.list;
  } catch {
    return null;
  }
}

interface CjDetailResponse {
  code: number;
  result: boolean;
  data?: CjProduct & { description?: string };
}

export async function getCjProduct(pid: string): Promise<CjDetailResponse["data"] | null> {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const json = await fetchJson<CjDetailResponse>(`${BASE_URL}/product/query?pid=${encodeURIComponent(pid)}`, {
      method: "GET",
      headers: { "CJ-Access-Token": token },
    });
    if (!json.result || !json.data) return null;
    return json.data;
  } catch {
    return null;
  }
}

/** Parses CJ's "12.50-15.30" or "12.50" sellPrice string into a single USD number (lowest tier). */
export function parseCjCost(sellPrice: string): number {
  const first = sellPrice.split("-")[0]?.trim();
  const value = Number.parseFloat(first ?? "");
  return Number.isFinite(value) ? value : 0;
}
