import type { AdminListSubscriptionOrderCycleEventsQuery } from '../../dtos/orderOpsDtos';
import prisma from '../../../../infrastructure/db/prismaClient';

export class AdminListSubscriptionOrderCycleEventsUseCase {
  async execute(query: AdminListSubscriptionOrderCycleEventsQuery) {
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
      prisma.subscriptionOrderCycleEvent.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.subscriptionOrderCycleEvent.count({ where }),
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

