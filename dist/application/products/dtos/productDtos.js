"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPublicProductsQuerySchema = exports.listMyProductsQuerySchema = exports.updateProductFormBodySchema = exports.createProductFormBodySchema = exports.productImageMetaItemSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const productImageSchema = zod_1.z.object({
    imageUrl: zod_1.z.string().min(1),
    isPrimary: zod_1.z.boolean().optional().default(false),
    sortOrder: zod_1.z.number().int().optional().default(0),
});
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().optional().nullable(),
    categoryId: zod_1.z.string().min(1),
    unit: zod_1.z.string().min(1),
    basePrice: zod_1.z.number().positive(),
    images: zod_1.z.array(productImageSchema).optional().default([]),
});
exports.updateProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional().nullable(),
    categoryId: zod_1.z.string().min(1).optional(),
    unit: zod_1.z.string().min(1).optional(),
    basePrice: zod_1.z.number().positive().optional(),
    isActive: zod_1.z.boolean().optional(),
    /** When provided, replaces all product images with this set. */
    images: zod_1.z.array(productImageSchema).optional(),
});
/** Per-image options for form-data upload; order in array matches order of uploaded files. */
exports.productImageMetaItemSchema = zod_1.z.object({
    isPrimary: zod_1.z.boolean().optional(),
    sortOrder: zod_1.z.number().int().optional(),
});
exports.createProductFormBodySchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().optional().nullable(),
    categoryId: zod_1.z.string().min(1),
    unit: zod_1.z.string().min(1),
    basePrice: zod_1.z.coerce.number().positive(),
    /** Optional JSON string: array of { isPrimary?, sortOrder? } — one entry per image, same order as files. */
    imageMeta: zod_1.z.string().optional(),
});
/** Form-data body for product update (all optional). When images are uploaded, they replace existing. */
exports.updateProductFormBodySchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional().nullable(),
    categoryId: zod_1.z.string().min(1).optional(),
    unit: zod_1.z.string().min(1).optional(),
    basePrice: zod_1.z.coerce.number().positive().optional(),
    isActive: zod_1.z.coerce.boolean().optional(),
    /** Optional JSON array of { isPrimary?, sortOrder? } — one per uploaded image, same order as files. */
    imageMeta: zod_1.z.string().optional(),
});
exports.listMyProductsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(200).default(20),
    name: zod_1.z.string().min(1).optional(),
    categoryId: zod_1.z.string().min(1).optional(),
    isActive: zod_1.z.coerce.boolean().optional(),
});
/** Public product list query (defaults to active-only). */
exports.listPublicProductsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    name: zod_1.z.string().min(1).optional(),
    categoryId: zod_1.z.string().min(1).optional(),
    isActive: zod_1.z.coerce.boolean().optional().default(true),
});
//# sourceMappingURL=productDtos.js.map