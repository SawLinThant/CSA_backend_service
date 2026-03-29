import { z } from 'zod';

export const createBoxSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  imageUrl: z.string().min(1).optional().nullable(),
  isActive: z.boolean().optional().default(true),
});

export const updateBoxSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().min(1).optional().nullable(),
  isActive: z.boolean().optional(),
});

export const listBoxesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  name: z.string().min(1).optional(),
  isActive: z.coerce.boolean().optional(),
});

export const publicBoxDetailQuerySchema = z.object({
  date: z.coerce.date().optional(),
});

export type CreateBoxInput = z.infer<typeof createBoxSchema>;
export type UpdateBoxInput = z.infer<typeof updateBoxSchema>;
export type ListBoxesQuery = z.infer<typeof listBoxesQuerySchema>;
export type PublicBoxDetailQuery = z.infer<typeof publicBoxDetailQuerySchema>;
