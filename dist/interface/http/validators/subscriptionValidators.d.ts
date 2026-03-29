export declare const subscriptionValidators: {
    createSubscription: import("zod").ZodObject<{
        planId: import("zod").ZodString;
        startDate: import("zod").ZodOptional<import("zod").ZodCoercedDate<unknown>>;
    }, import("zod/v4/core").$strip>;
    listMySubscriptionsQuery: import("zod").ZodObject<{
        page: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        limit: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        status: import("zod").ZodOptional<import("zod").ZodEnum<{
            active: "active";
            cancelled: "cancelled";
            paused: "paused";
        }>>;
    }, import("zod/v4/core").$strip>;
    pauseSubscription: import("zod").ZodObject<{
        pauseUntil: import("zod").ZodOptional<import("zod").ZodCoercedDate<unknown>>;
    }, import("zod/v4/core").$strip>;
};
//# sourceMappingURL=subscriptionValidators.d.ts.map