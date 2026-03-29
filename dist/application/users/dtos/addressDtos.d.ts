import { z } from 'zod';
export declare const createAddressSchema: z.ZodObject<{
    addressLine: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    postalCode: z.ZodString;
    country: z.ZodString;
    isDefault: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updateAddressSchema: z.ZodObject<{
    addressLine: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    postalCode: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    isDefault: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;
//# sourceMappingURL=addressDtos.d.ts.map