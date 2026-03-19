import { z } from 'zod';
export declare const createProductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    categoryId: z.ZodString;
    unit: z.ZodString;
    basePrice: z.ZodNumber;
    images: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        imageUrl: z.ZodString;
        isPrimary: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        sortOrder: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
export declare const updateProductSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    categoryId: z.ZodOptional<z.ZodString>;
    unit: z.ZodOptional<z.ZodString>;
    basePrice: z.ZodOptional<z.ZodNumber>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    images: z.ZodOptional<z.ZodArray<z.ZodObject<{
        imageUrl: z.ZodString;
        isPrimary: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        sortOrder: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
/** Per-image options for form-data upload; order in array matches order of uploaded files. */
export declare const productImageMetaItemSchema: z.ZodObject<{
    isPrimary: z.ZodOptional<z.ZodBoolean>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const createProductFormBodySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    categoryId: z.ZodString;
    unit: z.ZodString;
    basePrice: z.ZodCoercedNumber<unknown>;
    imageMeta: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/** Form-data body for product update (all optional). When images are uploaded, they replace existing. */
export declare const updateProductFormBodySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    categoryId: z.ZodOptional<z.ZodString>;
    unit: z.ZodOptional<z.ZodString>;
    basePrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    isActive: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    imageMeta: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const listMyProductsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    name: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
}, z.core.$strip>;
/** Public product list query (defaults to active-only). */
export declare const listPublicProductsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    name: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodOptional<z.ZodCoercedBoolean<unknown>>>;
}, z.core.$strip>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type CreateProductFormBody = z.infer<typeof createProductFormBodySchema>;
export type UpdateProductFormBody = z.infer<typeof updateProductFormBodySchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ListMyProductsQuery = z.infer<typeof listMyProductsQuerySchema>;
export type ListPublicProductsQuery = z.infer<typeof listPublicProductsQuerySchema>;
//# sourceMappingURL=productDtos.d.ts.map