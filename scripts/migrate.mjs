import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is not set (check .env.local).");
  process.exit(1);
}

const sql = neon(databaseUrl);
const schema = readFileSync(path.join(__dirname, "../db/schema.sql"), "utf8");

// Strip "--" comment lines individually (not just whole leading-comment
// chunks) before splitting on ";", so a comment directly above a statement
// can never accidentally swallow the statement itself.
const cleaned = schema
  .split("\n")
  .filter((line) => !line.trim().startsWith("--"))
  .join("\n");

const statements = cleaned
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

for (const statement of statements) {
  console.log(`Running: ${statement.slice(0, 60)}...`);
  await sql.query(statement);
}

console.log(`Done - ${statements.length} statement(s) applied.`);
