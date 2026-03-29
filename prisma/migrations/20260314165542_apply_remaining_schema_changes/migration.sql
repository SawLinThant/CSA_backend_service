/*
  Warnings:

  - The values [out_for_delivery] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `default_address_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `delivered_at` on the `deliveries` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_status` on the `deliveries` table. All the data in the column will be lost.
  - You are about to drop the column `driver_name` on the `deliveries` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `deliveries` table. All the data in the column will be lost.
  - You are about to drop the column `available_until` on the `harvests` table. All the data in the column will be lost.
  - You are about to drop the column `farmer_id` on the `harvests` table. All the data in the column will be lost.
  - You are about to drop the column `harvest_date` on the `harvests` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `harvests` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `harvests` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_date` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `paid_at` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_status` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `is_primary` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `sort_order` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `farmer_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `referred_user_id` on the `referrals` table. All the data in the column will be lost.
  - You are about to drop the column `referrer_id` on the `referrals` table. All the data in the column will be lost.
  - You are about to drop the column `reward_given` on the `referrals` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_frequency` on the `subscription_plans` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `subscription_plans` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `next_delivery_date` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `pause_until` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `plan_id` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the `subscription_plan_items` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `deliveries` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryStatus` to the `deliveries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `deliveries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availableUntil` to the `harvests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmerId` to the `harvests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `harvestDate` to the `harvests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `harvests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityAvailable` to the `harvests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `harvests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmerId` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boxVersionId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `product_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `product_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basePrice` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmerId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referredUserId` to the `referrals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referrerId` to the `referrals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boxId` to the `subscription_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveriesPerCycle` to the `subscription_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryFrequency` to the `subscription_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nextDeliveryDate` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planId` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HarvestStatus" AS ENUM ('pending', 'approved', 'rejected');

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('pending', 'packed', 'shipped', 'delivered', 'cancelled');
ALTER TABLE "public"."orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- DropForeignKey
ALTER TABLE "deliveries" DROP CONSTRAINT "deliveries_order_id_fkey";

-- DropForeignKey
ALTER TABLE "harvests" DROP CONSTRAINT "harvests_farmer_id_fkey";

-- DropForeignKey
ALTER TABLE "harvests" DROP CONSTRAINT "harvests_product_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_product_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_subscription_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_order_id_fkey";

-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_farmer_id_fkey";

-- DropForeignKey
ALTER TABLE "referrals" DROP CONSTRAINT "referrals_referred_user_id_fkey";

-- DropForeignKey
ALTER TABLE "referrals" DROP CONSTRAINT "referrals_referrer_id_fkey";

-- DropForeignKey
ALTER TABLE "subscription_plan_items" DROP CONSTRAINT "subscription_plan_items_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "subscription_plan_items" DROP CONSTRAINT "subscription_plan_items_product_id_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_plan_id_fkey";

-- DropIndex
DROP INDEX "deliveries_order_id_key";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "country" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "default_address_id";

-- AlterTable
ALTER TABLE "deliveries" DROP COLUMN "delivered_at",
DROP COLUMN "delivery_status",
DROP COLUMN "driver_name",
DROP COLUMN "order_id",
ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "deliveryDriver" TEXT,
ADD COLUMN     "deliveryStatus" "DeliveryStatus" NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "trackingCode" TEXT;

-- AlterTable
ALTER TABLE "farmers" ADD COLUMN     "farm_image" TEXT;

-- AlterTable
ALTER TABLE "harvests" DROP COLUMN "available_until",
DROP COLUMN "farmer_id",
DROP COLUMN "harvest_date",
DROP COLUMN "product_id",
DROP COLUMN "quantity",
ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedBy" TEXT,
ADD COLUMN     "availableUntil" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "farmerId" TEXT NOT NULL,
ADD COLUMN     "harvestDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "quantityAvailable" INTEGER NOT NULL,
ADD COLUMN     "status" "HarvestStatus" NOT NULL DEFAULT 'pending',
ADD COLUMN     "unitPrice" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "order_id",
DROP COLUMN "product_id",
ADD COLUMN     "farmerId" TEXT NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "created_at",
DROP COLUMN "customer_id",
DROP COLUMN "delivery_date",
DROP COLUMN "subscription_id",
DROP COLUMN "total_price",
ADD COLUMN     "boxVersionId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "deliveryDate" TIMESTAMP(3),
ADD COLUMN     "subscriptionId" TEXT,
ADD COLUMN     "totalPrice" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "order_id",
DROP COLUMN "paid_at",
DROP COLUMN "payment_method",
DROP COLUMN "payment_status",
DROP COLUMN "transaction_id",
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL,
ADD COLUMN     "transactionReference" TEXT;

-- AlterTable
ALTER TABLE "product_images" DROP COLUMN "created_at",
DROP COLUMN "image_url",
DROP COLUMN "is_primary",
DROP COLUMN "product_id",
DROP COLUMN "sort_order",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "category_id",
DROP COLUMN "created_at",
DROP COLUMN "farmer_id",
DROP COLUMN "is_active",
DROP COLUMN "price",
ADD COLUMN     "basePrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "farmerId" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "unit" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "referrals" DROP COLUMN "referred_user_id",
DROP COLUMN "referrer_id",
DROP COLUMN "reward_given",
ADD COLUMN     "referredUserId" TEXT NOT NULL,
ADD COLUMN     "referrerId" TEXT NOT NULL,
ADD COLUMN     "rewardGiven" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "subscription_plans" DROP COLUMN "delivery_frequency",
DROP COLUMN "description",
ADD COLUMN     "boxId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deliveriesPerCycle" INTEGER NOT NULL,
ADD COLUMN     "deliveryFrequency" "DeliveryFrequency" NOT NULL;

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "created_at",
DROP COLUMN "customer_id",
DROP COLUMN "next_delivery_date",
DROP COLUMN "pause_until",
DROP COLUMN "plan_id",
DROP COLUMN "start_date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "nextDeliveryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pauseUntil" TIMESTAMP(3),
ADD COLUMN     "planId" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable (guarded for fresh databases where updated_at does not exist yet)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'users'
      AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE "users" ALTER COLUMN "updated_at" DROP DEFAULT;
  END IF;
END $$;

-- DropTable
DROP TABLE "subscription_plan_items";

-- CreateTable
CREATE TABLE "boxes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "boxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "box_versions" (
    "id" TEXT NOT NULL,
    "boxId" TEXT NOT NULL,
    "versionName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "box_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "box_items" (
    "id" TEXT NOT NULL,
    "boxVersionId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "optional" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "box_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "deliveries_orderId_key" ON "deliveries"("orderId");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "harvests" ADD CONSTRAINT "harvests_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "harvests" ADD CONSTRAINT "harvests_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "harvests" ADD CONSTRAINT "harvests_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "box_versions" ADD CONSTRAINT "box_versions_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "boxes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "box_items" ADD CONSTRAINT "box_items_boxVersionId_fkey" FOREIGN KEY ("boxVersionId") REFERENCES "box_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "box_items" ADD CONSTRAINT "box_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "box_items" ADD CONSTRAINT "box_items_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription_plans" ADD CONSTRAINT "subscription_plans_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "boxes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "subscription_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_boxVersionId_fkey" FOREIGN KEY ("boxVersionId") REFERENCES "box_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
