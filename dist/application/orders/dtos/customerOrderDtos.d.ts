import { z } from 'zod';
export declare const listCustomerOrdersQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        packed: "packed";
        shipped: "shipped";
        delivered: "delivered";
        cancelled: "cancelled";
    }>>;
    statuses: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    from: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    to: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        createdAt: "createdAt";
        totalPrice: "totalPrice";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export type ListCustomerOrdersQuery = z.infer<typeof listCustomerOrdersQuerySchema>;
//# sourceMappingURL=customerOrderDtos.d.ts.map