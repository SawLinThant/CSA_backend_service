-- CreateEnum
CREATE TYPE "CapacityStatus" AS ENUM ('open', 'locked', 'closed');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('reserved', 'consumed', 'released', 'expired');

-- CreateTable
CREATE TABLE "capacity_snapshots" (
    "id" TEXT NOT NULL,
    "box_version_id" TEXT NOT NULL,
    "cycle_date" TIMESTAMP(3) NOT NULL,
    "max_boxes" INTEGER NOT NULL,
    "reserved_boxes" INTEGER NOT NULL DEFAULT 0,
    "consumed_boxes" INTEGER NOT NULL DEFAULT 0,
    "status" "CapacityStatus" NOT NULL DEFAULT 'open',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "capacity_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_reservations" (
    "id" TEXT NOT NULL,
    "subscription_id" TEXT NOT NULL,
    "box_version_id" TEXT NOT NULL,
    "capacity_snapshot_id" TEXT NOT NULL,
    "cycle_date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "status" "ReservationStatus" NOT NULL DEFAULT 'reserved',
    "reason" TEXT,
    "idempotency_key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_reservations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "capacity_snapshot_version_cycle_key" ON "capacity_snapshots"("box_version_id", "cycle_date");

-- CreateIndex
CREATE INDEX "capacity_snapshot_cycle_idx" ON "capacity_snapshots"("cycle_date");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_reservations_idempotency_key_key" ON "inventory_reservations"("idempotency_key");

-- CreateIndex
CREATE UNIQUE INDEX "reservation_subscription_cycle_key" ON "inventory_reservations"("subscription_id", "cycle_date");

-- CreateIndex
CREATE INDEX "reservation_status_cycle_idx" ON "inventory_reservations"("status", "cycle_date");

-- AddForeignKey
ALTER TABLE "capacity_snapshots" ADD CONSTRAINT "capacity_snapshots_box_version_id_fkey" FOREIGN KEY ("box_version_id") REFERENCES "box_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_reservations" ADD CONSTRAINT "inventory_reservations_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_reservations" ADD CONSTRAINT "inventory_reservations_box_version_id_fkey" FOREIGN KEY ("box_version_id") REFERENCES "box_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_reservations" ADD CONSTRAINT "inventory_reservations_capacity_snapshot_id_fkey" FOREIGN KEY ("capacity_snapshot_id") REFERENCES "capacity_snapshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
