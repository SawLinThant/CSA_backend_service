import { z } from 'zod';

const orderStatusEnum = z.enum(['pending', 'packed', 'shipped', 'delivered', 'cancelled']);

export const listCustomerOrdersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: orderStatusEnum.optional(),
  /** Comma-separated statuses, e.g. `pending,packed,shipped`. If set, overrides `status`. */
  statuses: z.string().optional(),
  search: z.string().optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  sortBy: z.enum(['createdAt', 'totalPrice']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type ListCustomerOrdersQuery = z.infer<typeof listCustomerOrdersQuerySchema>;
