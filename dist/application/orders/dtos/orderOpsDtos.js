"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminListSubscriptionOrderCycleEventsQuerySchema = exports.adminSubscriptionOrderOpsSummaryQuerySchema = void 0;
const zod_1 = require("zod");
exports.adminSubscriptionOrderOpsSummaryQuerySchema = zod_1.z.object({
    from: zod_1.z.coerce.date().optional(),
    to: zod_1.z.coerce.date().optional(),
    referenceDate: zod_1.z.coerce.date().optional(),
});
exports.adminListSubscriptionOrderCycleEventsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(200).default(20),
    outcome: zod_1.z.enum(['created', 'skipped', 'failed']).optional(),
    reason: zod_1.z.string().min(1).optional(),
    subscriptionId: zod_1.z.string().min(1).optional(),
    from: zod_1.z.coerce.date().optional(),
    to: zod_1.z.coerce.date().optional(),
});
//# sourceMappingURL=orderOpsDtos.js.map