import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Customer
 *
 */
export type Customer = Prisma.CustomerModel;
/**
 * Model Farmer
 *
 */
export type Farmer = Prisma.FarmerModel;
/**
 * Model Address
 *
 */
export type Address = Prisma.AddressModel;
/**
 * Model Category
 *
 */
export type Category = Prisma.CategoryModel;
/**
 * Model Product
 *
 */
export type Product = Prisma.ProductModel;
/**
 * Model ProductImage
 *
 */
export type ProductImage = Prisma.ProductImageModel;
/**
 * Model Harvest
 *
 */
export type Harvest = Prisma.HarvestModel;
/**
 * Model Box
 *
 */
export type Box = Prisma.BoxModel;
/**
 * Model BoxVersion
 *
 */
export type BoxVersion = Prisma.BoxVersionModel;
/**
 * Model BoxItem
 *
 */
export type BoxItem = Prisma.BoxItemModel;
/**
 * Model SubscriptionPlan
 *
 */
export type SubscriptionPlan = Prisma.SubscriptionPlanModel;
/**
 * Model Subscription
 *
 */
export type Subscription = Prisma.SubscriptionModel;
/**
 * Model Order
 *
 */
export type Order = Prisma.OrderModel;
/**
 * Model OrderItem
 *
 */
export type OrderItem = Prisma.OrderItemModel;
/**
 * Model Payment
 *
 */
export type Payment = Prisma.PaymentModel;
/**
 * Model Delivery
 *
 */
export type Delivery = Prisma.DeliveryModel;
/**
 * Model Referral
 *
 */
export type Referral = Prisma.ReferralModel;
//# sourceMappingURL=client.d.ts.map