"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pauseSubscriptionSchema = exports.listMySubscriptionsQuerySchema = exports.createSubscriptionSchema = void 0;
const zod_1 = require("zod");
exports.createSubscriptionSchema = zod_1.z.object({
    planId: zod_1.z.string().min(1),
    startDate: zod_1.z.coerce.date().optional(),
});
exports.listMySubscriptionsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    status: zod_1.z.enum(['active', 'paused', 'cancelled']).optional(),
});
exports.pauseSubscriptionSchema = zod_1.z.object({
    pauseUntil: zod_1.z.coerce.date().optional(),
});
//# sourceMappingURL=subscriptionDtos.js.map