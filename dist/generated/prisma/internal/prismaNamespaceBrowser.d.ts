import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Customer: "Customer";
    readonly Farmer: "Farmer";
    readonly Address: "Address";
    readonly Category: "Category";
    readonly Product: "Product";
    readonly ProductImage: "ProductImage";
    readonly Harvest: "Harvest";
    readonly SubscriptionPlan: "SubscriptionPlan";
    readonly SubscriptionPlanItem: "SubscriptionPlanItem";
    readonly Subscription: "Subscription";
    readonly Order: "Order";
    readonly OrderItem: "OrderItem";
    readonly Payment: "Payment";
    readonly Delivery: "Delivery";
    readonly Referral: "Referral";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly phone: "phone";
    readonly password: "password";
    readonly role: "role";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const CustomerScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly defaultAddressId: "defaultAddressId";
    readonly createdAt: "createdAt";
};
export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum];
export declare const FarmerScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly farmName: "farmName";
    readonly farmLocation: "farmLocation";
    readonly farmDescription: "farmDescription";
    readonly approved: "approved";
    readonly createdAt: "createdAt";
};
export type FarmerScalarFieldEnum = (typeof FarmerScalarFieldEnum)[keyof typeof FarmerScalarFieldEnum];
export declare const AddressScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly addressLine: "addressLine";
    readonly city: "city";
    readonly state: "state";
    readonly postalCode: "postalCode";
    readonly isDefault: "isDefault";
};
export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly price: "price";
    readonly categoryId: "categoryId";
    readonly farmerId: "farmerId";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const ProductImageScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly imageUrl: "imageUrl";
    readonly isPrimary: "isPrimary";
    readonly sortOrder: "sortOrder";
    readonly createdAt: "createdAt";
};
export type ProductImageScalarFieldEnum = (typeof ProductImageScalarFieldEnum)[keyof typeof ProductImageScalarFieldEnum];
export declare const HarvestScalarFieldEnum: {
    readonly id: "id";
    readonly farmerId: "farmerId";
    readonly productId: "productId";
    readonly quantity: "quantity";
    readonly harvestDate: "harvestDate";
    readonly availableUntil: "availableUntil";
};
export type HarvestScalarFieldEnum = (typeof HarvestScalarFieldEnum)[keyof typeof HarvestScalarFieldEnum];
export declare const SubscriptionPlanScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly price: "price";
    readonly deliveryFrequency: "deliveryFrequency";
    readonly active: "active";
};
export type SubscriptionPlanScalarFieldEnum = (typeof SubscriptionPlanScalarFieldEnum)[keyof typeof SubscriptionPlanScalarFieldEnum];
export declare const SubscriptionPlanItemScalarFieldEnum: {
    readonly id: "id";
    readonly planId: "planId";
    readonly productId: "productId";
    readonly quantity: "quantity";
};
export type SubscriptionPlanItemScalarFieldEnum = (typeof SubscriptionPlanItemScalarFieldEnum)[keyof typeof SubscriptionPlanItemScalarFieldEnum];
export declare const SubscriptionScalarFieldEnum: {
    readonly id: "id";
    readonly customerId: "customerId";
    readonly planId: "planId";
    readonly status: "status";
    readonly startDate: "startDate";
    readonly nextDeliveryDate: "nextDeliveryDate";
    readonly pauseUntil: "pauseUntil";
    readonly createdAt: "createdAt";
};
export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly customerId: "customerId";
    readonly subscriptionId: "subscriptionId";
    readonly status: "status";
    readonly totalPrice: "totalPrice";
    readonly deliveryDate: "deliveryDate";
    readonly createdAt: "createdAt";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly productId: "productId";
    readonly quantity: "quantity";
    readonly price: "price";
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly amount: "amount";
    readonly paymentMethod: "paymentMethod";
    readonly paymentStatus: "paymentStatus";
    readonly transactionId: "transactionId";
    readonly paidAt: "paidAt";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const DeliveryScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly driverName: "driverName";
    readonly deliveryStatus: "deliveryStatus";
    readonly deliveredAt: "deliveredAt";
};
export type DeliveryScalarFieldEnum = (typeof DeliveryScalarFieldEnum)[keyof typeof DeliveryScalarFieldEnum];
export declare const ReferralScalarFieldEnum: {
    readonly id: "id";
    readonly referrerId: "referrerId";
    readonly referredUserId: "referredUserId";
    readonly rewardGiven: "rewardGiven";
};
export type ReferralScalarFieldEnum = (typeof ReferralScalarFieldEnum)[keyof typeof ReferralScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map