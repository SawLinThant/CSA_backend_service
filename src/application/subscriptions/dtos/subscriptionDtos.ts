import { z } from 'zod';

export const createSubscriptionSchema = z.object({
  planId: z.string().min(1),
  startDate: z.coerce.date().optional(),
});

export const listMySubscriptionsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(['active', 'paused', 'cancelled']).optional(),
});

export const pauseSubscriptionSchema = z.object({
  pauseUntil: z.coerce.date().optional(),
});

export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;
export type ListMySubscriptionsQuery = z.infer<typeof listMySubscriptionsQuerySchema>;
export type PauseSubscriptionInput = z.infer<typeof pauseSubscriptionSchema>;
