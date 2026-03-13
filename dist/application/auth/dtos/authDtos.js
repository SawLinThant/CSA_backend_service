"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.loginSchema = exports.registerFarmerSchema = exports.registerCustomerSchema = void 0;
const zod_1 = require("zod");
exports.registerCustomerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().min(6),
    password: zod_1.z.string().min(8),
});
exports.registerFarmerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().min(6),
    password: zod_1.z.string().min(8),
    farmName: zod_1.z.string().min(1),
    farmLocation: zod_1.z.string().min(1),
    farmDescription: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
    phone: zod_1.z.string().min(6),
    password: zod_1.z.string().min(8),
});
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1),
});
//# sourceMappingURL=authDtos.js.map