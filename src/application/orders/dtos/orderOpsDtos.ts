import { z } from 'zod';

export const adminSubscriptionOrderOpsSummaryQuerySchema = z.object({
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  referenceDate: z.coerce.date().optional(),
});

export const adminListSubscriptionOrderCycleEventsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(20),
  outcome: z.enum(['created', 'skipped', 'failed']).optional(),
  reason: z.string().min(1).optional(),
  subscriptionId: z.string().min(1).optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
});

export type AdminSubscriptionOrderOpsSummaryQuery = z.infer<typeof adminSubscriptionOrderOpsSummaryQuerySchema>;
export type AdminListSubscriptionOrderCycleEventsQuery = z.infer<typeof adminListSubscriptionOrderCycleEventsQuerySchema>;

