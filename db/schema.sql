CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_zip TEXT,
  items JSONB NOT NULL,
  subtotal_ils INTEGER NOT NULL,
  shipping_ils INTEGER NOT NULL,
  total_ils INTEGER NOT NULL,
  cj_order_id TEXT,
  shipped BOOLEAN NOT NULL DEFAULT FALSE,
  tracking_number TEXT,
  carrier_name TEXT,
  shipped_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);

-- PayPlus payment tracking: an order is created as 'pending' before the
-- customer pays, then flipped to 'paid'/'failed' by the webhook once PayPlus
-- confirms the transaction. The CJ order + confirmation email only fire once
-- payment_status reaches 'paid' (see app/api/payplus/webhook/route.ts).
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payplus_transaction_uid TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payplus_payment_url TEXT;
