"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicBoxDetailQuerySchema = exports.listBoxesQuerySchema = exports.updateBoxSchema = exports.createBoxSchema = void 0;
const zod_1 = require("zod");
exports.createBoxSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().optional().nullable(),
    imageUrl: zod_1.z.string().min(1).optional().nullable(),
    isActive: zod_1.z.boolean().optional().default(true),
});
exports.updateBoxSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional().nullable(),
    imageUrl: zod_1.z.string().min(1).optional().nullable(),
    isActive: zod_1.z.boolean().optional(),
});
exports.listBoxesQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    name: zod_1.z.string().min(1).optional(),
    isActive: zod_1.z.coerce.boolean().optional(),
});
exports.publicBoxDetailQuerySchema = zod_1.z.object({
    date: zod_1.z.coerce.date().optional(),
});
//# sourceMappingURL=boxDtos.js.map