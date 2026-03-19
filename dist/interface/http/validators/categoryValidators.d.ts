export declare const categoryValidators: {
    createCategory: import("zod").ZodObject<{
        name: import("zod").ZodString;
        description: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
    }, import("zod/v4/core").$strip>;
    updateCategory: import("zod").ZodObject<{
        name: import("zod").ZodOptional<import("zod").ZodString>;
        description: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
    }, import("zod/v4/core").$strip>;
    listCategoriesQuery: import("zod").ZodObject<{
        page: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        limit: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        name: import("zod").ZodOptional<import("zod").ZodString>;
    }, import("zod/v4/core").$strip>;
};
//# sourceMappingURL=categoryValidators.d.ts.map