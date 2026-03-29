"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGetSubscriptionOrderOpsSummaryUseCase = void 0;
const prismaClient_1 = __importDefault(require("../../../../infrastructure/db/prismaClient"));
class AdminGetSubscriptionOrderOpsSummaryUseCase {
    async execute(query) {
        const referenceDate = query.referenceDate ?? new Date();
        const createdAtFilter = query.from || query.to
            ? {
                ...(query.from ? { gte: query.from } : {}),
                ...(query.to ? { lte: query.to } : {}),
            }
            : undefined;
        const [dueSubscriptions, generatedOrders, failedTotal, failedByReason, pausedCapacitySubscriptions] = await Promise.all([
            prismaClient_1.default.subscription.count({
                where: {
                    status: 'active',
                    nextOrderDate: { lte: referenceDate, not: null },
                },
            }),
            prismaClient_1.default.order.count({
                where: {
                    subscriptionId: { not: null },
                    ...(createdAtFilter ? { createdAt: createdAtFilter } : {}),
                },
            }),
            prismaClient_1.default.subscriptionOrderCycleEvent.count({
                where: {
                    outcome: 'failed',
                    ...(createdAtFilter ? { createdAt: createdAtFilter } : {}),
                },
            }),
            prismaClient_1.default.subscriptionOrderCycleEvent.groupBy({
                by: ['reason'],
                where: {
                    outcome: 'failed',
                    ...(createdAtFilter ? { createdAt: createdAtFilter } : {}),
                },
                _count: { _all: true },
            }),
            prismaClient_1.default.subscription.count({
                where: {
                    status: 'paused',
                    OR: [{ pauseReason: 'capacity_exhausted' }, { pauseReason: 'paused_capacity' }],
                },
            }),
        ]);
        return {
            referenceDate,
            dueSubscriptions,
            generatedOrders,
            failedAttempts: {
                total: failedTotal,
                byReason: failedByReason.map((row) => ({
                    reason: row.reason ?? 'unknown',
                    count: row._count._all,
                })),
            },
            pausedCapacitySubscriptions,
        };
    }
}
exports.AdminGetSubscriptionOrderOpsSummaryUseCase = AdminGetSubscriptionOrderOpsSummaryUseCase;
//# sourceMappingURL=AdminGetSubscriptionOrderOpsSummaryUseCase.js.map