export declare const subscriptionPlanValidators: {
    createSubscriptionPlan: import("zod").ZodObject<{
        boxId: import("zod").ZodString;
        name: import("zod").ZodString;
        price: import("zod").ZodNumber;
        deliveryFrequency: import("zod").ZodEnum<{
            weekly: "weekly";
            monthly: "monthly";
        }>;
        deliveriesPerCycle: import("zod").ZodNumber;
        active: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodBoolean>>;
    }, import("zod/v4/core").$strip>;
    updateSubscriptionPlan: import("zod").ZodObject<{
        name: import("zod").ZodOptional<import("zod").ZodString>;
        price: import("zod").ZodOptional<import("zod").ZodNumber>;
        deliveryFrequency: import("zod").ZodOptional<import("zod").ZodEnum<{
            weekly: "weekly";
            monthly: "monthly";
        }>>;
        deliveriesPerCycle: import("zod").ZodOptional<import("zod").ZodNumber>;
        active: import("zod").ZodOptional<import("zod").ZodBoolean>;
    }, import("zod/v4/core").$strip>;
    listSubscriptionPlansQuery: import("zod").ZodObject<{
        page: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        limit: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        boxId: import("zod").ZodOptional<import("zod").ZodString>;
        active: import("zod").ZodOptional<import("zod").ZodCoercedBoolean<unknown>>;
    }, import("zod/v4/core").$strip>;
};
//# sourceMappingURL=subscriptionPlanValidators.d.ts.map