import { z } from 'zod';

export const registerCustomerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().min(6),
  password: z.string().min(8),
});

export const registerFarmerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().min(6),
  password: z.string().min(8),
  farmName: z.string().min(1),
  farmLocation: z.string().min(1),
  farmDescription: z.string().optional(),
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

