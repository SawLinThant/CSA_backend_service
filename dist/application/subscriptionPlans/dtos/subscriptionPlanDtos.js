"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSubscriptionPlansQuerySchema = exports.updateSubscriptionPlanSchema = exports.createSubscriptionPlanSchema = void 0;
const zod_1 = require("zod");
exports.createSubscriptionPlanSchema = zod_1.z.object({
    boxId: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    price: zod_1.z.number().positive(),
    deliveryFrequency: zod_1.z.enum(['weekly', 'monthly']),
    deliveriesPerCycle: zod_1.z.number().int().positive(),
    active: zod_1.z.boolean().optional().default(true),
});
exports.updateSubscriptionPlanSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    price: zod_1.z.number().positive().optional(),
    deliveryFrequency: zod_1.z.enum(['weekly', 'monthly']).optional(),
    deliveriesPerCycle: zod_1.z.number().int().positive().optional(),
    active: zod_1.z.boolean().optional(),
});
exports.listSubscriptionPlansQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    boxId: zod_1.z.string().min(1).optional(),
    active: zod_1.z.coerce.boolean().optional(),
});
//# sourceMappingURL=subscriptionPlanDtos.js.map