"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressSchema = exports.createAddressSchema = void 0;
const zod_1 = require("zod");
exports.createAddressSchema = zod_1.z.object({
    addressLine: zod_1.z.string().min(1),
    city: zod_1.z.string().min(1),
    state: zod_1.z.string().min(1),
    postalCode: zod_1.z.string().min(1),
    country: zod_1.z.string().min(1),
    isDefault: zod_1.z.boolean().optional(),
});
exports.updateAddressSchema = zod_1.z
    .object({
    addressLine: zod_1.z.string().min(1).optional(),
    city: zod_1.z.string().min(1).optional(),
    state: zod_1.z.string().min(1).optional(),
    postalCode: zod_1.z.string().min(1).optional(),
    country: zod_1.z.string().min(1).optional(),
    isDefault: zod_1.z.boolean().optional(),
})
    .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field is required',
});
//# sourceMappingURL=addressDtos.js.map