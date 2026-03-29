-- Phase 1 for subscription-driven order generation.
-- Keep new fields nullable to avoid data loss and allow progressive rollout.

ALTER TABLE "subscriptions"
ADD COLUMN IF NOT EXISTS "nextOrderDate" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "lastOrderDate" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "pauseReason" TEXT;

-- Seed nextOrderDate from existing cadence column to avoid nulls on current active rows.
UPDATE "subscriptions"
SET "nextOrderDate" = "nextDeliveryDate"
WHERE "nextOrderDate" IS NULL
  AND "nextDeliveryDate" IS NOT NULL;

CREATE INDEX IF NOT EXISTS "subscriptions_status_next_order_idx"
ON "subscriptions"("status", "nextOrderDate");

ALTER TABLE "orders"
ADD COLUMN IF NOT EXISTS "cycleDate" TIMESTAMP(3);

CREATE INDEX IF NOT EXISTS "orders_cycle_date_idx"
ON "orders"("cycleDate");

-- Idempotency for generated orders per subscription cycle.
CREATE UNIQUE INDEX IF NOT EXISTS "orders_subscription_cycle_key"
ON "orders"("subscriptionId", "cycleDate");
