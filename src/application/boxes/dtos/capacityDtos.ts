import { z } from 'zod';

export const recomputeBoxVersionCapacitySchema = z.object({
  cycleDate: z.coerce.date(),
});

export const listCapacitySnapshotsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(20),
  boxVersionId: z.string().min(1).optional(),
  status: z.enum(['open', 'locked', 'closed']).optional(),
  cycleDateFrom: z.coerce.date().optional(),
  cycleDateTo: z.coerce.date().optional(),
});

export const updateCapacitySnapshotStatusSchema = z.object({
  status: z.enum(['open', 'locked', 'closed']),
});

export const listInventoryReservationsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(20),
  status: z.enum(['reserved', 'consumed', 'released', 'expired']).optional(),
  cycleDateFrom: z.coerce.date().optional(),
  cycleDateTo: z.coerce.date().optional(),
});

export type RecomputeBoxVersionCapacityInput = z.infer<typeof recomputeBoxVersionCapacitySchema>;
export type ListCapacitySnapshotsQuery = z.infer<typeof listCapacitySnapshotsQuerySchema>;
export type UpdateCapacitySnapshotStatusInput = z.infer<typeof updateCapacitySnapshotStatusSchema>;
export type ListInventoryReservationsQuery = z.infer<typeof listInventoryReservationsQuerySchema>;

