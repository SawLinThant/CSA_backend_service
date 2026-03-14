import { z } from 'zod';

export const updateCustomerProfileSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().min(6).optional(),
  email: z.string().email().optional().nullable(),
});

export const updateFarmerProfileSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().min(6).optional(),
  email: z.string().email().optional().nullable(),
  farmName: z.string().min(1).optional(),
  farmLocation: z.string().min(1).optional(),
  farmDescription: z.string().optional().nullable(),
});

export const adminCreateCustomerSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(6),
  email: z.string().email().optional(),
  password: z.string().min(8),
});

export const adminUpdateCustomerSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().min(6).optional(),
  email: z.string().email().optional().nullable(),
  status: z.enum(['active', 'suspended']).optional(),
});

export const listCustomersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  name: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  usertype: z.enum(['admin', 'customer', 'farmer']).optional(),
});

export const listFarmersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  name: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
});

export type UpdateCustomerProfileInput = z.infer<typeof updateCustomerProfileSchema>;
export type UpdateFarmerProfileInput = z.infer<typeof updateFarmerProfileSchema>;
export type AdminCreateCustomerInput = z.infer<typeof adminCreateCustomerSchema>;
export type AdminUpdateCustomerInput = z.infer<typeof adminUpdateCustomerSchema>;
export type ListCustomersQuery = z.infer<typeof listCustomersQuerySchema>;
export type ListFarmersQuery = z.infer<typeof listFarmersQuerySchema>;
