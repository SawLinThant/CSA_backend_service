import type { AdminSubscriptionOrderOpsSummaryQuery } from '../../dtos/orderOpsDtos';
import prisma from '../../../../infrastructure/db/prismaClient';

export class AdminGetSubscriptionOrderOpsSummaryUseCase {
  async execute(query: AdminSubscriptionOrderOpsSummaryQuery) {
    const referenceDate = query.referenceDate ?? new Date();
    const createdAtFilter =
      query.from || query.to
        ? {
            ...(query.from ? { gte: query.from } : {}),
            ...(query.to ? { lte: query.to } : {}),
          }
        : undefined;

    const [dueSubscriptions, generatedOrders, failedTotal, failedByReason, pausedCapacitySubscriptions] = await Promise.all([
      prisma.subscription.count({
        where: {
          status: 'active',
          nextOrderDate: { lte: referenceDate, not: null },
        },
      }),
      prisma.order.count({
        where: {
          subscriptionId: { not: null },
          ...(createdAtFilter ? { createdAt: createdAtFilter } : {}),
        },
      }),
      prisma.subscriptionOrderCycleEvent.count({
        where: {
          outcome: 'failed',
          ...(createdAtFilter ? { createdAt: createdAtFilter } : {}),
        },
      }),
      prisma.subscriptionOrderCycleEvent.groupBy({
        by: ['reason'],
        where: {
          outcome: 'failed',
          ...(createdAtFilter ? { createdAt: createdAtFilter } : {}),
        },
        _count: { _all: true },
      }),
      prisma.subscription.count({
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

