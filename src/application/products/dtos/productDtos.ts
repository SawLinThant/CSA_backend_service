import { z } from 'zod';

const productImageSchema = z.object({
  imageUrl: z.string().min(1),
  isPrimary: z.boolean().optional().default(false),
  sortOrder: z.number().int().optional().default(0),
});

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  categoryId: z.string().min(1),
  unit: z.string().min(1),
  basePrice: z.number().positive(),
  images: z.array(productImageSchema).optional().default([]),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  categoryId: z.string().min(1).optional(),
  unit: z.string().min(1).optional(),
  basePrice: z.number().positive().optional(),
  isActive: z.boolean().optional(),
  /** When provided, replaces all product images with this set. */
  images: z.array(productImageSchema).optional(),
});

/** Per-image options for form-data upload; order in array matches order of uploaded files. */
export const productImageMetaItemSchema = z.object({
  isPrimary: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export const createProductFormBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  categoryId: z.string().min(1),
  unit: z.string().min(1),
  basePrice: z.coerce.number().positive(),
  /** Optional JSON string: array of { isPrimary?, sortOrder? } — one entry per image, same order as files. */
  imageMeta: z.string().optional(),
});

/** Form-data body for product update (all optional). When images are uploaded, they replace existing. */
export const updateProductFormBodySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  categoryId: z.string().min(1).optional(),
  unit: z.string().min(1).optional(),
  basePrice: z.coerce.number().positive().optional(),
  isActive: z.coerce.boolean().optional(),
  /** Optional JSON array of { isPrimary?, sortOrder? } — one per uploaded image, same order as files. */
  imageMeta: z.string().optional(),
});

export const listMyProductsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  name: z.string().min(1).optional(),
  categoryId: z.string().min(1).optional(),
  isActive: z.coerce.boolean().optional(),
});

/** Public product list query (defaults to active-only). */
export const listPublicProductsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  name: z.string().min(1).optional(),
  categoryId: z.string().min(1).optional(),
  isActive: z.coerce.boolean().optional().default(true),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type CreateProductFormBody = z.infer<typeof createProductFormBodySchema>;
export type UpdateProductFormBody = z.infer<typeof updateProductFormBodySchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ListMyProductsQuery = z.infer<typeof listMyProductsQuerySchema>;
export type ListPublicProductsQuery = z.infer<typeof listPublicProductsQuerySchema>;
