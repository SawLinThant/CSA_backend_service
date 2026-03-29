import { z } from 'zod';
export declare const recomputeBoxVersionCapacitySchema: z.ZodObject<{
    cycleDate: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
export declare const listCapacitySnapshotsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    boxVersionId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        open: "open";
        locked: "locked";
        closed: "closed";
    }>>;
    cycleDateFrom: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    cycleDateTo: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const updateCapacitySnapshotStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        open: "open";
        locked: "locked";
        closed: "closed";
    }>;
}, z.core.$strip>;
export declare const listInventoryReservationsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        reserved: "reserved";
        consumed: "consumed";
        released: "released";
        expired: "expired";
    }>>;
    cycleDateFrom: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    cycleDateTo: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type RecomputeBoxVersionCapacityInput = z.infer<typeof recomputeBoxVersionCapacitySchema>;
export type ListCapacitySnapshotsQuery = z.infer<typeof listCapacitySnapshotsQuerySchema>;
export type UpdateCapacitySnapshotStatusInput = z.infer<typeof updateCapacitySnapshotStatusSchema>;
export type ListInventoryReservationsQuery = z.infer<typeof listInventoryReservationsQuerySchema>;
//# sourceMappingURL=capacityDtos.d.ts.map