import { z } from 'zod';
export declare const orderStatusEnum: z.ZodEnum<{
    pending: "pending";
    packed: "packed";
    shipped: "shipped";
    delivered: "delivered";
    cancelled: "cancelled";
}>;
export declare const deliveryStatusEnum: z.ZodEnum<{
    delivered: "delivered";
    scheduled: "scheduled";
    out_for_delivery: "out_for_delivery";
    failed: "failed";
}>;
export declare const adminUpdateOrderStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        pending: "pending";
        packed: "packed";
        shipped: "shipped";
        delivered: "delivered";
        cancelled: "cancelled";
    }>;
}, z.core.$strip>;
export declare const adminUpsertDeliverySchema: z.ZodObject<{
    deliveryStatus: z.ZodEnum<{
        delivered: "delivered";
        scheduled: "scheduled";
        out_for_delivery: "out_for_delivery";
        failed: "failed";
    }>;
    deliveryDriver: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    trackingCode: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    deliveredAt: z.ZodNullable<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
}, z.core.$strip>;
export type AdminUpdateOrderStatusInput = z.infer<typeof adminUpdateOrderStatusSchema>;
export type AdminUpsertDeliveryInput = z.infer<typeof adminUpsertDeliverySchema>;
//# sourceMappingURL=adminOrderDtos.d.ts.map