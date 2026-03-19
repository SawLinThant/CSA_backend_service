import { z } from 'zod';
export declare const createBoxVersionSchema: z.ZodObject<{
    boxId: z.ZodString;
    versionName: z.ZodString;
    startDate: z.ZodCoercedDate<unknown>;
    endDate: z.ZodNullable<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
}, z.core.$strip>;
export declare const updateBoxVersionSchema: z.ZodObject<{
    versionName: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    endDate: z.ZodNullable<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
}, z.core.$strip>;
export declare const listBoxVersionsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    boxId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateBoxVersionInput = z.infer<typeof createBoxVersionSchema>;
export type UpdateBoxVersionInput = z.infer<typeof updateBoxVersionSchema>;
export type ListBoxVersionsQuery = z.infer<typeof listBoxVersionsQuerySchema>;
//# sourceMappingURL=boxVersionDtos.d.ts.map