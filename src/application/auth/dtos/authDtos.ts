import { z } from 'zod';

const otpSixDigits = z
  .string()
  .regex(/^\d{6}$/, 'OTP must be exactly 6 digits');

export const registerCustomerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional().nullable(),
  phone: z.string().min(6),
  password: z.string().min(8),
  /** Beta: any 6-digit code is accepted when provided; omit for legacy direct registration. */
  otp: otpSixDigits.optional(),
});

export const registerFarmerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional().nullable(),
  phone: z.string().min(6),
  password: z.string().min(8),
  farmName: z.string().min(1),
  farmLocation: z.string().min(1),
  farmDescription: z.string().optional(),
  /** Beta: any 6-digit code is accepted when provided; omit for legacy direct registration. */
  otp: otpSixDigits.optional(),
});

export const sendOtpSchema = z.object({
  phone: z.string().min(6),
});

export const loginSchema = z.object({
  phone: z.string().min(6),
  password: z.string().min(8),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

export type RegisterCustomerInput = z.infer<typeof registerCustomerSchema>;
export type RegisterFarmerInput = z.infer<typeof registerFarmerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type SendOtpInput = z.infer<typeof sendOtpSchema>;

