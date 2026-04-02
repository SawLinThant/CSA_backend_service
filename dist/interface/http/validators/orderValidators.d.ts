export declare const orderValidators: {
    listCustomerOrdersQuery: import("zod").ZodObject<{
        page: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        limit: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        status: import("zod").ZodOptional<import("zod").ZodEnum<{
            pending: "pending";
            packed: "packed";
            shipped: "shipped";
            delivered: "delivered";
            cancelled: "cancelled";
        }>>;
        statuses: import("zod").ZodOptional<import("zod").ZodString>;
        search: import("zod").ZodOptional<import("zod").ZodString>;
        from: import("zod").ZodOptional<import("zod").ZodCoercedDate<unknown>>;
        to: import("zod").ZodOptional<import("zod").ZodCoercedDate<unknown>>;
        sortBy: import("zod").ZodDefault<import("zod").ZodEnum<{
            createdAt: "createdAt";
            totalPrice: "totalPrice";
        }>>;
        sortOrder: import("zod").ZodDefault<import("zod").ZodEnum<{
            asc: "asc";
            desc: "desc";
        }>>;
    }, import("zod/v4/core").$strip>;
    adminUpdateOrderStatus: import("zod").ZodObject<{
        status: import("zod").ZodEnum<{
            pending: "pending";
            packed: "packed";
            shipped: "shipped";
            delivered: "delivered";
            cancelled: "cancelled";
        }>;
    }, import("zod/v4/core").$strip>;
    adminUpsertDelivery: import("zod").ZodObject<{
        deliveryStatus: import("zod").ZodEnum<{
            delivered: "delivered";
            scheduled: "scheduled";
            out_for_delivery: "out_for_delivery";
            failed: "failed";
        }>;
        deliveryDriver: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
        trackingCode: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
        deliveredAt: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodCoercedDate<unknown>>>;
    }, import("zod/v4/core").$strip>;
};
//# sourceMappingURL=orderValidators.d.ts.map