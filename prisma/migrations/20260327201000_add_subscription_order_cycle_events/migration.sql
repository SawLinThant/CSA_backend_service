DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'SubscriptionOrderCycleOutcome') THEN
    CREATE TYPE "SubscriptionOrderCycleOutcome" AS ENUM ('created', 'skipped', 'failed');
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS "subscription_order_cycle_events" (
  "id" TEXT NOT NULL,
  "subscription_id" TEXT,
  "cycle_date" TIMESTAMP(3),
  "reference_date" TIMESTAMP(3) NOT NULL,
  "outcome" "SubscriptionOrderCycleOutcome" NOT NULL,
  "reason" TEXT,
  "attempt" INTEGER NOT NULL DEFAULT 1,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "subscription_order_cycle_events_pkey" PRIMARY KEY ("id")
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'subscription_order_cycle_events_subscription_id_fkey'
  ) THEN
    ALTER TABLE "subscription_order_cycle_events"
    ADD CONSTRAINT "subscription_order_cycle_events_subscription_id_fkey"
    FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id")
    ON DELETE SET NULL
    ON UPDATE CASCADE;
  END IF;
END
$$;

CREATE INDEX IF NOT EXISTS "subscription_cycle_events_created_idx"
ON "subscription_order_cycle_events"("created_at");

CREATE INDEX IF NOT EXISTS "subscription_cycle_events_subscription_cycle_idx"
ON "subscription_order_cycle_events"("subscription_id", "cycle_date");

CREATE INDEX IF NOT EXISTS "subscription_cycle_events_outcome_created_idx"
ON "subscription_order_cycle_events"("outcome", "created_at");
