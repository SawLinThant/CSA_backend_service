import { z } from 'zod';
export declare const updateCustomerProfileSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const updateFarmerProfileSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    farmName: z.ZodOptional<z.ZodString>;
    farmLocation: z.ZodOptional<z.ZodString>;
    farmDescription: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const adminCreateCustomerSchema: z.ZodObject<{
    name: z.ZodString;
    phone: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, z.core.$strip>;
export declare const adminUpdateCustomerSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodEnum<{
        active: "active";
        suspended: "suspended";
    }>>;
}, z.core.$strip>;
export declare const listCustomersQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    usertype: z.ZodOptional<z.ZodEnum<{
        admin: "admin";
        customer: "customer";
        farmer: "farmer";
    }>>;
}, z.core.$strip>;
export declare const listFarmersQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type UpdateCustomerProfileInput = z.infer<typeof updateCustomerProfileSchema>;
export type UpdateFarmerProfileInput = z.infer<typeof updateFarmerProfileSchema>;
export type AdminCreateCustomerInput = z.infer<typeof adminCreateCustomerSchema>;
export type AdminUpdateCustomerInput = z.infer<typeof adminUpdateCustomerSchema>;
export type ListCustomersQuery = z.infer<typeof listCustomersQuerySchema>;
export type ListFarmersQuery = z.infer<typeof listFarmersQuerySchema>;
//# sourceMappingURL=userDtos.d.ts.map