import { z } from 'zod';
export declare const createSubscriptionSchema: z.ZodObject<{
    planId: z.ZodString;
    startDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const listMySubscriptionsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        active: "active";
        paused: "paused";
        cancelled: "cancelled";
    }>>;
}, z.core.$strip>;
export declare const pauseSubscriptionSchema: z.ZodObject<{
    pauseUntil: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;
export type ListMySubscriptionsQuery = z.infer<typeof listMySubscriptionsQuerySchema>;
export type PauseSubscriptionInput = z.infer<typeof pauseSubscriptionSchema>;
//# sourceMappingURL=subscriptionDtos.d.ts.map