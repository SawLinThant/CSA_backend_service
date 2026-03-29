"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.loginSchema = exports.sendOtpSchema = exports.registerFarmerSchema = exports.registerCustomerSchema = void 0;
const zod_1 = require("zod");
const otpSixDigits = zod_1.z
    .string()
    .regex(/^\d{6}$/, 'OTP must be exactly 6 digits');
exports.registerCustomerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email().optional().nullable(),
    phone: zod_1.z.string().min(6),
    password: zod_1.z.string().min(8),
    /** Beta: any 6-digit code is accepted when provided; omit for legacy direct registration. */
    otp: otpSixDigits.optional(),
});
exports.registerFarmerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email().optional().nullable(),
    phone: zod_1.z.string().min(6),
    password: zod_1.z.string().min(8),
    farmName: zod_1.z.string().min(1),
    farmLocation: zod_1.z.string().min(1),
    farmDescription: zod_1.z.string().optional(),
    /** Beta: any 6-digit code is accepted when provided; omit for legacy direct registration. */
    otp: otpSixDigits.optional(),
});
exports.sendOtpSchema = zod_1.z.object({
    phone: zod_1.z.string().min(6),
});
exports.loginSchema = zod_1.z.object({
    phone: zod_1.z.string().min(6),
    password: zod_1.z.string().min(8),
});
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1),
});
//# sourceMappingURL=authDtos.js.map