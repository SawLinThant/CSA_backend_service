import { z } from 'zod';
export declare const createSubscriptionPlanSchema: z.ZodObject<{
    boxId: z.ZodString;
    name: z.ZodString;
    price: z.ZodNumber;
    deliveryFrequency: z.ZodEnum<{
        weekly: "weekly";
        monthly: "monthly";
    }>;
    deliveriesPerCycle: z.ZodNumber;
    active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const updateSubscriptionPlanSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    deliveryFrequency: z.ZodOptional<z.ZodEnum<{
        weekly: "weekly";
        monthly: "monthly";
    }>>;
    deliveriesPerCycle: z.ZodOptional<z.ZodNumber>;
    active: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const listSubscriptionPlansQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    boxId: z.ZodOptional<z.ZodString>;
    active: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
}, z.core.$strip>;
export type CreateSubscriptionPlanInput = z.infer<typeof createSubscriptionPlanSchema>;
export type UpdateSubscriptionPlanInput = z.infer<typeof updateSubscriptionPlanSchema>;
export type ListSubscriptionPlansQuery = z.infer<typeof listSubscriptionPlansQuerySchema>;
//# sourceMappingURL=subscriptionPlanDtos.d.ts.map