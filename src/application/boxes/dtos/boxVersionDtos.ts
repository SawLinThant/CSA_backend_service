import { z } from 'zod';

export const createBoxVersionSchema = z
  .object({
    boxId: z.string().min(1),
    versionName: z.string().min(1),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.endDate != null) return data.endDate >= data.startDate;
      return true;
    },
    { message: 'endDate must be on or after startDate', path: ['endDate'] },
  );

export const updateBoxVersionSchema = z
  .object({
    versionName: z.string().min(1).optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.startDate !== undefined && data.endDate != null) return data.endDate >= data.startDate;
      return true;
    },
    { message: 'endDate must be on or after startDate', path: ['endDate'] },
  );

export const listBoxVersionsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  boxId: z.string().min(1).optional(),
});

export type CreateBoxVersionInput = z.infer<typeof createBoxVersionSchema>;
export type UpdateBoxVersionInput = z.infer<typeof updateBoxVersionSchema>;
export type ListBoxVersionsQuery = z.infer<typeof listBoxVersionsQuerySchema>;
