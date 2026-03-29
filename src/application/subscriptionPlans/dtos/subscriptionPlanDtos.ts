import { z } from 'zod';

export const createSubscriptionPlanSchema = z.object({
  boxId: z.string().min(1),
  name: z.string().min(1),
  price: z.number().positive(),
  deliveryFrequency: z.enum(['weekly', 'monthly']),
  deliveriesPerCycle: z.number().int().positive(),
  active: z.boolean().optional().default(true),
});

export const updateSubscriptionPlanSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  deliveryFrequency: z.enum(['weekly', 'monthly']).optional(),
  deliveriesPerCycle: z.number().int().positive().optional(),
  active: z.boolean().optional(),
});

export const listSubscriptionPlansQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  boxId: z.string().min(1).optional(),
  active: z.coerce.boolean().optional(),
  deliveryFrequency: z.enum(['weekly', 'monthly']).optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  sortBy: z.enum(['newest', 'priceAsc', 'priceDesc', 'nameAsc']).optional(),
});

export type CreateSubscriptionPlanInput = z.infer<typeof createSubscriptionPlanSchema>;
export type UpdateSubscriptionPlanInput = z.infer<typeof updateSubscriptionPlanSchema>;
export type ListSubscriptionPlansQuery = z.infer<typeof listSubscriptionPlansQuerySchema>;
