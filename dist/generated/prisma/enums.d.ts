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
export declare const HarvestStatus: {
    readonly pending: "pending";
    readonly approved: "approved";
    readonly rejected: "rejected";
};
export type HarvestStatus = (typeof HarvestStatus)[keyof typeof HarvestStatus];
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
    readonly shipped: "shipped";
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
export declare const CapacityStatus: {
    readonly open: "open";
    readonly locked: "locked";
    readonly closed: "closed";
};
export type CapacityStatus = (typeof CapacityStatus)[keyof typeof CapacityStatus];
export declare const ReservationStatus: {
    readonly reserved: "reserved";
    readonly consumed: "consumed";
    readonly released: "released";
    readonly expired: "expired";
};
export type ReservationStatus = (typeof ReservationStatus)[keyof typeof ReservationStatus];
export declare const SubscriptionOrderCycleOutcome: {
    readonly created: "created";
    readonly skipped: "skipped";
    readonly failed: "failed";
};
export type SubscriptionOrderCycleOutcome = (typeof SubscriptionOrderCycleOutcome)[keyof typeof SubscriptionOrderCycleOutcome];
//# sourceMappingURL=enums.d.ts.map