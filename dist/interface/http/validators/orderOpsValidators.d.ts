export declare const orderOpsValidators: {
    summaryQuery: import("zod").ZodObject<{
        from: import("zod").ZodOptional<import("zod").ZodCoercedDate<unknown>>;
        to: import("zod").ZodOptional<import("zod").ZodCoercedDate<unknown>>;
        referenceDate: import("zod").ZodOptional<import("zod").ZodCoercedDate<unknown>>;
    }, import("zod/v4/core").$strip>;
    listCycleEventsQuery: import("zod").ZodObject<{
        page: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        limit: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        outcome: import("zod").ZodOptional<import("zod").ZodEnum<{
            created: "created";
            skipped: "skipped";
            failed: "failed";
        }>>;
        reason: import("zod").ZodOptional<import("zod").ZodString>;
        subscriptionId: import("zod").ZodOptional<import("zod").ZodString>;
        from: import("zod").ZodOptional<import("zod").ZodCoercedDate<unknown>>;
        to: import("zod").ZodOptional<import("zod").ZodCoercedDate<unknown>>;
    }, import("zod/v4/core").$strip>;
};
//# sourceMappingURL=orderOpsValidators.d.ts.map