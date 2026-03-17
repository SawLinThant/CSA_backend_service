import { z } from 'zod';

export const createBoxItemSchema = z.object({
  boxVersionId: z.string().min(1),
  productId: z.string().min(1),
  farmerId: z.string().min(1),
  quantity: z.number().int().positive(),
  optional: z.boolean().optional().default(false),
});

export const updateBoxItemSchema = z.object({
  quantity: z.number().int().positive().optional(),
  optional: z.boolean().optional(),
});

export type CreateBoxItemInput = z.infer<typeof createBoxItemSchema>;
export type UpdateBoxItemInput = z.infer<typeof updateBoxItemSchema>;
