import { z } from 'zod';
export declare const createHarvestSchema: z.ZodObject<{
    productId: z.ZodString;
    quantityAvailable: z.ZodNumber;
    unitPrice: z.ZodNumber;
    harvestDate: z.ZodCoercedDate<unknown>;
    availableUntil: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
export declare const updateHarvestSchema: z.ZodObject<{
    quantityAvailable: z.ZodOptional<z.ZodNumber>;
    unitPrice: z.ZodOptional<z.ZodNumber>;
    harvestDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    availableUntil: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const listMyHarvestsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    productId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        approved: "approved";
        pending: "pending";
        rejected: "rejected";
    }>>;
    harvestDateFrom: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    harvestDateTo: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const listHarvestsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    farmerId: z.ZodOptional<z.ZodString>;
    productId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        approved: "approved";
        pending: "pending";
        rejected: "rejected";
    }>>;
    harvestDateFrom: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    harvestDateTo: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type CreateHarvestInput = z.infer<typeof createHarvestSchema>;
export type UpdateHarvestInput = z.infer<typeof updateHarvestSchema>;
export type ListMyHarvestsQuery = z.infer<typeof listMyHarvestsQuerySchema>;
export type ListHarvestsQuery = z.infer<typeof listHarvestsQuerySchema>;
//# sourceMappingURL=harvestDtos.d.ts.map