import type { SubscriptionPlan } from '../../../domain/subscriptions/SubscriptionPlan';
import type {
  SubscriptionPlanRepository,
  SubscriptionPlanCreateData,
  SubscriptionPlanUpdateData,
  SubscriptionPlanListFilters,
} from '../../../domain/subscriptions/SubscriptionPlanRepository';
import prisma from '../prismaClient';

function mapRowToPlan(row: {
  id: string;
  boxId: string;
  name: string;
  price: unknown;
  deliveryFrequency: string;
  deliveriesPerCycle: number;
  active: boolean;
  createdAt: Date;
}): SubscriptionPlan {
  return {
    id: row.id,
    boxId: row.boxId,
    name: row.name,
    price: Number(row.price),
    deliveryFrequency: row.deliveryFrequency as SubscriptionPlan['deliveryFrequency'],
    deliveriesPerCycle: row.deliveriesPerCycle,
    active: row.active,
    createdAt: row.createdAt,
  };
}

export class PrismaSubscriptionPlanRepository implements SubscriptionPlanRepository {
  async findById(id: string): Promise<SubscriptionPlan | null> {
    const row = await prisma.subscriptionPlan.findUnique({ where: { id } });
    if (!row) return null;
    return mapRowToPlan(row);
  }

  async list(
    skip: number,
    take: number,
    filters?: SubscriptionPlanListFilters,
  ): Promise<{ items: SubscriptionPlan[]; total: number }> {
    const where: { boxId?: string; active?: boolean } = {};
    if (filters?.boxId) where.boxId = filters.boxId;
    if (filters?.active !== undefined) where.active = filters.active;
    const hasWhere = Object.keys(where).length > 0;

    const [items, total] = await Promise.all([
      prisma.subscriptionPlan.findMany({
        skip,
        take,
        ...(hasWhere && { where }),
        orderBy: { createdAt: 'desc' },
      }),
      hasWhere ? prisma.subscriptionPlan.count({ where }) : prisma.subscriptionPlan.count(),
    ]);
    return {
      items: items.map(mapRowToPlan),
      total,
    };
  }

  async create(data: SubscriptionPlanCreateData): Promise<SubscriptionPlan> {
    const row = await prisma.subscriptionPlan.create({
      data: {
        boxId: data.boxId,
        name: data.name,
        price: data.price,
        deliveryFrequency: data.deliveryFrequency,
        deliveriesPerCycle: data.deliveriesPerCycle,
        active: data.active ?? true,
      },
    });
    return mapRowToPlan(row);
  }

  async update(id: string, data: SubscriptionPlanUpdateData): Promise<SubscriptionPlan> {
    const row = await prisma.subscriptionPlan.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.deliveryFrequency !== undefined && { deliveryFrequency: data.deliveryFrequency }),
        ...(data.deliveriesPerCycle !== undefined && { deliveriesPerCycle: data.deliveriesPerCycle }),
        ...(data.active !== undefined && { active: data.active }),
      },
    });
    return mapRowToPlan(row);
  }

  async delete(id: string): Promise<void> {
    await prisma.subscriptionPlan.delete({ where: { id } });
  }

  async countSubscriptionsByPlanId(planId: string): Promise<number> {
    return prisma.subscription.count({ where: { planId } });
  }
}
