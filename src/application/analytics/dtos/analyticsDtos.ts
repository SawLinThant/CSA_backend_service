import { z } from 'zod';

export const visitorsRangeQuerySchema = z.object({
  range: z.enum(['7d', '30d', '90d', '6m']).optional().default('6m'),
});

export type VisitorsRangeQueryInput = z.infer<typeof visitorsRangeQuerySchema>;

