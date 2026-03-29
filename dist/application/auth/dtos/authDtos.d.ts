import { z } from 'zod';
export declare const registerCustomerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    phone: z.ZodString;
    password: z.ZodString;
    otp: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const registerFarmerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    phone: z.ZodString;
    password: z.ZodString;
    farmName: z.ZodString;
    farmLocation: z.ZodString;
    farmDescription: z.ZodOptional<z.ZodString>;
    otp: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const sendOtpSchema: z.ZodObject<{
    phone: z.ZodString;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    phone: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const refreshTokenSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, z.core.$strip>;
export type RegisterCustomerInput = z.infer<typeof registerCustomerSchema>;
export type RegisterFarmerInput = z.infer<typeof registerFarmerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type SendOtpInput = z.infer<typeof sendOtpSchema>;
//# sourceMappingURL=authDtos.d.ts.map