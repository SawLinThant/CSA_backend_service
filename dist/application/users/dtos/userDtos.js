"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFarmersQuerySchema = exports.listCustomersQuerySchema = exports.adminUpdateCustomerSchema = exports.adminCreateCustomerSchema = exports.updateFarmerProfileSchema = exports.updateCustomerProfileSchema = void 0;
const zod_1 = require("zod");
exports.updateCustomerProfileSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    phone: zod_1.z.string().min(6).optional(),
    email: zod_1.z.string().email().optional().nullable(),
});
exports.updateFarmerProfileSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    phone: zod_1.z.string().min(6).optional(),
    email: zod_1.z.string().email().optional().nullable(),
    farmName: zod_1.z.string().min(1).optional(),
    farmLocation: zod_1.z.string().min(1).optional(),
    farmDescription: zod_1.z.string().optional().nullable(),
});
exports.adminCreateCustomerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    phone: zod_1.z.string().min(6),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(8),
});
exports.adminUpdateCustomerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    phone: zod_1.z.string().min(6).optional(),
    email: zod_1.z.string().email().optional().nullable(),
    status: zod_1.z.enum(['active', 'suspended']).optional(),
});
exports.listCustomersQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    name: zod_1.z.string().min(1).optional(),
    phone: zod_1.z.string().min(1).optional(),
    usertype: zod_1.z.enum(['admin', 'customer', 'farmer']).optional(),
});
exports.listFarmersQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    name: zod_1.z.string().min(1).optional(),
    phone: zod_1.z.string().min(1).optional(),
});
//# sourceMappingURL=userDtos.js.map