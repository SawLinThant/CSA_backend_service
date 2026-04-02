import { z } from 'zod';

export const orderStatusEnum = z.enum(['pending', 'packed', 'shipped', 'delivered', 'cancelled']);
export const deliveryStatusEnum = z.enum(['scheduled', 'out_for_delivery', 'delivered', 'failed']);

export const adminUpdateOrderStatusSchema = z.object({
  status: orderStatusEnum,
});

export const adminUpsertDeliverySchema = z
  .object({
    deliveryStatus: deliveryStatusEnum,
    deliveryDriver: z.string().trim().min(1).optional().nullable(),
    trackingCode: z.string().trim().min(1).optional().nullable(),
    deliveredAt: z.coerce.date().optional().nullable(),
  })
  .superRefine((val, ctx) => {
    if (val.deliveryStatus === 'delivered' && !val.deliveredAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['deliveredAt'],
        message: 'deliveredAt is required when deliveryStatus is delivered',
      });
    }
  });

export type AdminUpdateOrderStatusInput = z.infer<typeof adminUpdateOrderStatusSchema>;
export type AdminUpsertDeliveryInput = z.infer<typeof adminUpsertDeliverySchema>;

