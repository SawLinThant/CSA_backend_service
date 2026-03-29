"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListSubscriptionOrderCycleEventsUseCase = void 0;
const prismaClient_1 = __importDefault(require("../../../../infrastructure/db/prismaClient"));
class AdminListSubscriptionOrderCycleEventsUseCase {
    async execute(query) {
        const where = {
            ...(query.outcome ? { outcome: query.outcome } : {}),
            ...(query.reason ? { reason: query.reason } : {}),
            ...(query.subscriptionId ? { subscriptionId: query.subscriptionId } : {}),
            ...(query.from || query.to
                ? {
                    createdAt: {
                        ...(query.from ? { gte: query.from } : {}),
                        ...(query.to ? { lte: query.to } : {}),
                    },
                }
                : {}),
        };
        const skip = (query.page - 1) * query.limit;
        const [items, total] = await Promise.all([
            prismaClient_1.default.subscriptionOrderCycleEvent.findMany({
                where,
                skip,
                take: query.limit,
                orderBy: { createdAt: 'desc' },
            }),
            prismaClient_1.default.subscriptionOrderCycleEvent.count({ where }),
        ]);
        return {
            items: items.map((item) => ({
                id: item.id,
                subscriptionId: item.subscriptionId,
                cycleDate: item.cycleDate,
                referenceDate: item.referenceDate,
                outcome: item.outcome,
                reason: item.reason,
                attempt: item.attempt,
                createdAt: item.createdAt,
            })),
            total,
            page: query.page,
            limit: query.limit,
            totalPages: Math.max(1, Math.ceil(total / query.limit)),
        };
    }
}
exports.AdminListSubscriptionOrderCycleEventsUseCase = AdminListSubscriptionOrderCycleEventsUseCase;
//# sourceMappingURL=AdminListSubscriptionOrderCycleEventsUseCase.js.map