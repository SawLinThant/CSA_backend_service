import { z } from 'zod';

export const createHarvestSchema = z.object({
  productId: z.string().min(1),
  quantityAvailable: z.number().int().positive(),
  unitPrice: z.number().positive(),
  harvestDate: z.coerce.date(),
  availableUntil: z.coerce.date(),
}).refine((data) => data.availableUntil >= data.harvestDate, {
  message: 'availableUntil must be on or after harvestDate',
  path: ['availableUntil'],
});

export const updateHarvestSchema = z.object({
  quantityAvailable: z.number().int().positive().optional(),
  unitPrice: z.number().positive().optional(),
  harvestDate: z.coerce.date().optional(),
  availableUntil: z.coerce.date().optional(),
}).refine(
  (data) => {
    if (data.harvestDate !== undefined && data.availableUntil !== undefined) {
      return data.availableUntil >= data.harvestDate;
    }
    return true;
  },
  { message: 'availableUntil must be on or after harvestDate', path: ['availableUntil'] },
);

export const listMyHarvestsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  productId: z.string().min(1).optional(),
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
  harvestDateFrom: z.coerce.date().optional(),
  harvestDateTo: z.coerce.date().optional(),
}).refine(
  (data) => {
    if (data.harvestDateFrom && data.harvestDateTo) {
      return data.harvestDateTo >= data.harvestDateFrom;
    }
    return true;
  },
  { message: 'harvestDateTo must be on or after harvestDateFrom', path: ['harvestDateTo'] },
);

export const listHarvestsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  farmerId: z.string().min(1).optional(),
  productId: z.string().min(1).optional(),
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
  harvestDateFrom: z.coerce.date().optional(),
  harvestDateTo: z.coerce.date().optional(),
}).refine(
  (data) => {
    if (data.harvestDateFrom && data.harvestDateTo) {
      return data.harvestDateTo >= data.harvestDateFrom;
    }
    return true;
  },
  { message: 'harvestDateTo must be on or after harvestDateFrom', path: ['harvestDateTo'] },
);

export type CreateHarvestInput = z.infer<typeof createHarvestSchema>;
export type UpdateHarvestInput = z.infer<typeof updateHarvestSchema>;
export type ListMyHarvestsQuery = z.infer<typeof listMyHarvestsQuerySchema>;
export type ListHarvestsQuery = z.infer<typeof listHarvestsQuerySchema>;
