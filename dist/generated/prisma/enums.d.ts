export declare const UserRole: {
    readonly admin: "admin";
    readonly customer: "customer";
    readonly farmer: "farmer";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const UserStatus: {
    readonly active: "active";
    readonly suspended: "suspended";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const DeliveryFrequency: {
    readonly weekly: "weekly";
    readonly monthly: "monthly";
};
export type DeliveryFrequency = (typeof DeliveryFrequency)[keyof typeof DeliveryFrequency];
export declare const SubscriptionStatus: {
    readonly active: "active";
    readonly paused: "paused";
    readonly cancelled: "cancelled";
};
export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];
export declare const OrderStatus: {
    readonly pending: "pending";
    readonly packed: "packed";
    readonly out_for_delivery: "out_for_delivery";
    readonly delivered: "delivered";
    readonly cancelled: "cancelled";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const PaymentStatus: {
    readonly pending: "pending";
    readonly success: "success";
    readonly failed: "failed";
    readonly refunded: "refunded";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const DeliveryStatus: {
    readonly scheduled: "scheduled";
    readonly out_for_delivery: "out_for_delivery";
    readonly delivered: "delivered";
    readonly failed: "failed";
};
export type DeliveryStatus = (typeof DeliveryStatus)[keyof typeof DeliveryStatus];
//# sourceMappingURL=enums.d.ts.map