-- Add nullable box reference to keep existing data intact.
ALTER TABLE "subscriptions"
ADD COLUMN IF NOT EXISTS "boxId" TEXT;

-- Backfill from existing subscription plan linkage.
UPDATE "subscriptions" s
SET "boxId" = sp."boxId"
FROM "subscription_plans" sp
WHERE s."planId" = sp."id"
  AND s."boxId" IS NULL;

-- Add nullable FK for future writes.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'subscriptions_boxId_fkey'
  ) THEN
    ALTER TABLE "subscriptions"
    ADD CONSTRAINT "subscriptions_boxId_fkey"
    FOREIGN KEY ("boxId") REFERENCES "boxes"("id")
    ON DELETE SET NULL
    ON UPDATE CASCADE;
  END IF;
END
$$;

-- Helpful lookup index.
CREATE INDEX IF NOT EXISTS "subscriptions_customer_box_idx"
ON "subscriptions"("customerId", "boxId");

-- Deduplicate historical active subscriptions so unique indexes can be created safely.
-- Keep the newest active row per (customerId, planId), cancel older duplicates.
WITH ranked_plan AS (
  SELECT
    "id",
    ROW_NUMBER() OVER (
      PARTITION BY "customerId", "planId"
      ORDER BY "createdAt" DESC, "id" DESC
    ) AS rn
  FROM "subscriptions"
  WHERE "status" = 'active'
)
UPDATE "subscriptions" s
SET "status" = 'cancelled'
FROM ranked_plan rp
WHERE s."id" = rp."id"
  AND rp.rn > 1;

-- Then ensure one active row per (customerId, boxId) as well.
WITH ranked_box AS (
  SELECT
    "id",
    ROW_NUMBER() OVER (
      PARTITION BY "customerId", "boxId"
      ORDER BY "createdAt" DESC, "id" DESC
    ) AS rn
  FROM "subscriptions"
  WHERE "status" = 'active'
    AND "boxId" IS NOT NULL
)
UPDATE "subscriptions" s
SET "status" = 'cancelled'
FROM ranked_box rb
WHERE s."id" = rb."id"
  AND rb.rn > 1;

-- Enforce one active subscription per customer per plan.
CREATE UNIQUE INDEX IF NOT EXISTS "subscriptions_customer_plan_active_uniq"
ON "subscriptions"("customerId", "planId")
WHERE "status" = 'active';

-- Enforce one active subscription per customer per box.
CREATE UNIQUE INDEX IF NOT EXISTS "subscriptions_customer_box_active_uniq"
ON "subscriptions"("customerId", "boxId")
WHERE "status" = 'active' AND "boxId" IS NOT NULL;
