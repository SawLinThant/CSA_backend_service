import type { Subscription } from '../../../domain/subscriptions/Subscription';
import type {
  SubscriptionRepository,
  SubscriptionCreateData,
  SubscriptionUpdateData,
  SubscriptionListByCustomerFilters,
} from '../../../domain/subscriptions/SubscriptionRepository';
import prisma from '../prismaClient';

function mapRowToSubscription(row: {
  id: string;
  customerId: string;
  planId: string;
  status: string;
  startDate: Date;
  nextDeliveryDate: Date;
  pauseUntil: Date | null;
  createdAt: Date;
}): Subscription {
  return {
    id: row.id,
    customerId: row.customerId,
    planId: row.planId,
    status: row.status as Subscription['status'],
    startDate: row.startDate,
    nextDeliveryDate: row.nextDeliveryDate,
    pauseUntil: row.pauseUntil,
    createdAt: row.createdAt,
  };
}

export class PrismaSubscriptionRepository implements SubscriptionRepository {
  async create(data: SubscriptionCreateData): Promise<Subscription> {
    const row = await prisma.subscription.create({
      data: {
        customerId: data.customerId,
        planId: data.planId,
        status: data.status,
        startDate: data.startDate,
        nextDeliveryDate: data.nextDeliveryDate,
        pauseUntil: data.pauseUntil ?? null,
      },
    });
    return mapRowToSubscription(row);
  }

  async findById(id: string): Promise<Subscription | null> {
    const row = await prisma.subscription.findUnique({ where: { id } });
    if (!row) return null;
    return mapRowToSubscription(row);
  }

  async findByIdAndCustomerId(id: string, customerId: string): Promise<Subscription | null> {
    const row = await prisma.subscription.findFirst({
      where: { id, customerId },
    });
    if (!row) return null;
    return mapRowToSubscription(row);
  }

  async listByCustomerId(
    customerId: string,
    skip: number,
    take: number,
    filters?: SubscriptionListByCustomerFilters,
  ): Promise<{ items: Subscription[]; total: number }> {
    const where: { customerId: string; status?: Subscription['status'] } = { customerId };
    if (filters?.status) where.status = filters.status;

    const [items, total] = await Promise.all([
      prisma.subscription.findMany({
        skip,
        take,
        where,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.subscription.count({ where }),
    ]);
    return {
      items: items.map(mapRowToSubscription),
      total,
    };
  }

  async update(id: string, data: SubscriptionUpdateData): Promise<Subscription> {
    const row = await prisma.subscription.update({
      where: { id },
      data: {
        ...(data.status !== undefined && { status: data.status }),
        ...(data.nextDeliveryDate !== undefined && { nextDeliveryDate: data.nextDeliveryDate }),
        ...(data.pauseUntil !== undefined && { pauseUntil: data.pauseUntil }),
      },
    });
    return mapRowToSubscription(row);
  }
}
