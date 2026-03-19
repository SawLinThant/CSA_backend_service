import { z } from 'zod';
export declare const createBoxItemSchema: z.ZodObject<{
    boxVersionId: z.ZodString;
    productId: z.ZodString;
    farmerId: z.ZodString;
    quantity: z.ZodNumber;
    optional: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const updateBoxItemSchema: z.ZodObject<{
    quantity: z.ZodOptional<z.ZodNumber>;
    optional: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateBoxItemInput = z.infer<typeof createBoxItemSchema>;
export type UpdateBoxItemInput = z.infer<typeof updateBoxItemSchema>;
//# sourceMappingURL=boxItemDtos.d.ts.map