export declare const harvestValidators: {
    createHarvest: import("zod").ZodObject<{
        productId: import("zod").ZodString;
        quantityAvailable: import("zod").ZodNumber;
        unitPrice: import("zod").ZodNumber;
        harvestDate: import("zod").ZodCoercedDate<unknown>;
        availableUntil: import("zod").ZodCoercedDate<unknown>;
    }, import("zod/v4/core").$strip>;
    updateHarvest: import("zod").ZodObject<{
        quantityAvailable: import("zod").ZodOptional<import("zod").ZodNumber>;
        unitPrice: import("zod").ZodOptional<import("zod").ZodNumber>;
        harvestDate: import("zod").ZodOptional<import("zod").ZodCoercedDate<unknown>>;
        availableUntil: import("zod").ZodOptional<import("zod").ZodCoercedDate<unknown>>;
    }, import("zod/v4/core").$strip>;
    listMyHarvestsQuery: import("zod").ZodObject<{
        page: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        limit: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        productId: import("zod").ZodOptional<import("zod").ZodString>;
        status: import("zod").ZodOptional<import("zod").ZodEnum<{
            approved: "approved";
            pending: "pending";
            rejected: "rejected";
        }>>;
        harvestDateFrom: import("zod").ZodOptional<import("zod").ZodCoercedDate<unknown>>;
        harvestDateTo: import("zod").ZodOptional<import("zod").ZodCoercedDate<unknown>>;
    }, import("zod/v4/core").$strip>;
    listHarvestsQuery: import("zod").ZodObject<{
        page: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        limit: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        farmerId: import("zod").ZodOptional<import("zod").ZodString>;
        productId: import("zod").ZodOptional<import("zod").ZodString>;
        status: import("zod").ZodOptional<import("zod").ZodEnum<{
            approved: "approved";
            pending: "pending";
            rejected: "rejected";
        }>>;
        harvestDateFrom: import("zod").ZodOptional<import("zod").ZodCoercedDate<unknown>>;
        harvestDateTo: import("zod").ZodOptional<import("zod").ZodCoercedDate<unknown>>;
    }, import("zod/v4/core").$strip>;
};
//# sourceMappingURL=harvestValidators.d.ts.map