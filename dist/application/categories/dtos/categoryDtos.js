"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCategoriesQuerySchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().optional().nullable(),
});
exports.updateCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional().nullable(),
});
exports.listCategoriesQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    name: zod_1.z.string().min(1).optional(),
});
//# sourceMappingURL=categoryDtos.js.map