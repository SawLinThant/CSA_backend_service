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
};
//# sourceMappingURL=orderValidators.d.ts.map