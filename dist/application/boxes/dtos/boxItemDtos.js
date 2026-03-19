"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBoxItemSchema = exports.createBoxItemSchema = void 0;
const zod_1 = require("zod");
exports.createBoxItemSchema = zod_1.z.object({
    boxVersionId: zod_1.z.string().min(1),
    productId: zod_1.z.string().min(1),
    farmerId: zod_1.z.string().min(1),
    quantity: zod_1.z.number().int().positive(),
    optional: zod_1.z.boolean().optional().default(false),
});
exports.updateBoxItemSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().positive().optional(),
    optional: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=boxItemDtos.js.map