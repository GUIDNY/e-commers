import "server-only";
import { neon, NeonQueryFunction } from "@neondatabase/serverless";

// Lazy-init: build must not require DATABASE_URL (Vercel imports route
// modules during page-data collection), so the client is only constructed
// on first real query, same pattern as lib/cj.ts's token cache.
let client: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    client = neon(url);
  }
  return client;
}
