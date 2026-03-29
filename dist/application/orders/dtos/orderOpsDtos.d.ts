import { z } from 'zod';
export declare const adminSubscriptionOrderOpsSummaryQuerySchema: z.ZodObject<{
    from: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    to: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    referenceDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const adminListSubscriptionOrderCycleEventsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    outcome: z.ZodOptional<z.ZodEnum<{
        created: "created";
        skipped: "skipped";
        failed: "failed";
    }>>;
    reason: z.ZodOptional<z.ZodString>;
    subscriptionId: z.ZodOptional<z.ZodString>;
    from: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    to: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type AdminSubscriptionOrderOpsSummaryQuery = z.infer<typeof adminSubscriptionOrderOpsSummaryQuerySchema>;
export type AdminListSubscriptionOrderCycleEventsQuery = z.infer<typeof adminListSubscriptionOrderCycleEventsQuerySchema>;
//# sourceMappingURL=orderOpsDtos.d.ts.map