export declare const userValidators: {
    updateCustomerProfile: import("zod").ZodObject<{
        name: import("zod").ZodOptional<import("zod").ZodString>;
        phone: import("zod").ZodOptional<import("zod").ZodString>;
        email: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
    }, import("zod/v4/core").$strip>;
    updateFarmerProfile: import("zod").ZodObject<{
        name: import("zod").ZodOptional<import("zod").ZodString>;
        phone: import("zod").ZodOptional<import("zod").ZodString>;
        email: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
        farmName: import("zod").ZodOptional<import("zod").ZodString>;
        farmLocation: import("zod").ZodOptional<import("zod").ZodString>;
        farmDescription: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
    }, import("zod/v4/core").$strip>;
    adminCreateCustomer: import("zod").ZodObject<{
        name: import("zod").ZodString;
        phone: import("zod").ZodString;
        email: import("zod").ZodOptional<import("zod").ZodString>;
        password: import("zod").ZodString;
    }, import("zod/v4/core").$strip>;
    adminUpdateCustomer: import("zod").ZodObject<{
        name: import("zod").ZodOptional<import("zod").ZodString>;
        phone: import("zod").ZodOptional<import("zod").ZodString>;
        email: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
        status: import("zod").ZodOptional<import("zod").ZodEnum<{
            active: "active";
            suspended: "suspended";
        }>>;
    }, import("zod/v4/core").$strip>;
    listCustomersQuery: import("zod").ZodObject<{
        page: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        limit: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        name: import("zod").ZodOptional<import("zod").ZodString>;
        phone: import("zod").ZodOptional<import("zod").ZodString>;
        usertype: import("zod").ZodOptional<import("zod").ZodEnum<{
            admin: "admin";
            customer: "customer";
            farmer: "farmer";
        }>>;
    }, import("zod/v4/core").$strip>;
    listFarmersQuery: import("zod").ZodObject<{
        page: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        limit: import("zod").ZodDefault<import("zod").ZodCoercedNumber<unknown>>;
        name: import("zod").ZodOptional<import("zod").ZodString>;
        phone: import("zod").ZodOptional<import("zod").ZodString>;
    }, import("zod/v4/core").$strip>;
};
//# sourceMappingURL=userValidators.d.ts.map