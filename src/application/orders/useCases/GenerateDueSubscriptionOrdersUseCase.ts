import prisma from '../../../infrastructure/db/prismaClient';
import { logger } from '../../../core/logging/logger';
import { CycleDateCalculator } from '../../../domain/orders/services/CycleDateCalculator';
import { SubscriptionOrderEligibilityService } from '../../../domain/orders/services/SubscriptionOrderEligibilityService';
import { OrderFromSubscriptionFactory } from '../../../domain/orders/services/OrderFromSubscriptionFactory';

function addDays(date: Date, days: number): Date {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + days);
  return d;
}

function estimateDeliveryDays(deliveryFrequency: 'weekly' | 'monthly'): number {
  return deliveryFrequency === 'weekly' ? 2 : 3;
}

export interface GenerateDueSubscriptionOrdersResult {
  referenceDate: Date;
  scanned: number;
  created: number;
  skipped: number;
  failed: number;
}

export class GenerateDueSubscriptionOrdersUseCase {
  constructor(
    private readonly cycleDateCalculator = new CycleDateCalculator(),
    private readonly eligibilityService = new SubscriptionOrderEligibilityService(),
    private readonly orderFactory = new OrderFromSubscriptionFactory(),
  ) {}

  async execute(referenceDate = new Date(), batchSize = 100, attempt = 1): Promise<GenerateDueSubscriptionOrdersResult> {
    const take = Math.max(1, Math.min(batchSize, 500));
    let lastSeenId: string | undefined;
    let scanned = 0;
    let created = 0;
    let skipped = 0;
    let failed = 0;

    while (true) {
      const dueSubscriptions = await prisma.subscription.findMany({
        where: {
          status: 'active',
          nextOrderDate: {
            lte: referenceDate,
            not: null,
          },
          ...(lastSeenId ? { id: { gt: lastSeenId } } : {}),
        },
        select: { id: true },
        orderBy: { id: 'asc' },
        take,
      });

      if (dueSubscriptions.length === 0) break;
      scanned += dueSubscriptions.length;

      for (const due of dueSubscriptions) {
        try {
          const outcome = await this.processSubscription(due.id, referenceDate, attempt);
          if (outcome === 'created') created += 1;
          else skipped += 1;
        } catch (error) {
          failed += 1;
          await prisma.subscriptionOrderCycleEvent.create({
            data: {
              subscriptionId: due.id,
              referenceDate,
              outcome: 'failed',
              reason: error instanceof Error ? error.message : String(error),
              attempt,
            },
          });
          logger.error('Generate due orders failed for subscription', {
            subscriptionId: due.id,
            referenceDate: referenceDate.toISOString(),
            err: error instanceof Error ? error.message : String(error),
          });
        }
      }

      lastSeenId = dueSubscriptions[dueSubscriptions.length - 1]?.id;
      if (dueSubscriptions.length < take) break;
    }

    return {
      referenceDate,
      scanned,
      created,
      skipped,
      failed,
    };
  }

  private async processSubscription(
    subscriptionId: string,
    referenceDate: Date,
    attempt: number,
  ): Promise<'created' | 'skipped'> {
    return prisma.$transaction(async (tx) => {
      const lockedRows = await tx.$queryRaw<Array<{ id: string }>>`
        SELECT id
        FROM subscriptions
        WHERE id = ${subscriptionId}
        FOR UPDATE
      `;
      if (!lockedRows[0]) return 'skipped';

      const subscription = await tx.subscription.findUnique({
        where: { id: subscriptionId },
        include: {
          plan: true,
          customer: {
            select: { userId: true },
          },
        },
      });
      if (!subscription) return 'skipped';

      const hasAddress =
        (await tx.address.count({
          where: { userId: subscription.customer.userId },
        })) > 0;

      const eligibility = this.eligibilityService.evaluate({
        status: subscription.status,
        nextOrderDate: subscription.nextOrderDate,
        referenceDate,
        hasDeliveryAddress: hasAddress,
      });
      if (!eligibility.eligible) {
        if (eligibility.reason === 'missing_delivery_address') {
          await tx.subscription.update({
            where: { id: subscription.id },
            data: {
              pauseReason: 'missing_delivery_address',
            },
          });
        }
        await tx.subscriptionOrderCycleEvent.create({
          data: {
            subscriptionId: subscription.id,
            cycleDate: subscription.nextOrderDate,
            referenceDate,
            outcome: 'skipped',
            reason: eligibility.reason,
            attempt,
          },
        });
        return 'skipped';
      }

      const cycleDate = subscription.nextOrderDate;
      if (!cycleDate) return 'skipped';

      const existingOrder = await tx.order.findFirst({
        where: {
          subscriptionId: subscription.id,
          cycleDate,
        },
      });
      if (existingOrder) {
        const nextOrderDate = this.cycleDateCalculator.addCycle(cycleDate, subscription.plan.deliveryFrequency);
        await tx.subscription.update({
          where: { id: subscription.id },
          data: {
            lastOrderDate: cycleDate,
            nextOrderDate,
            nextDeliveryDate: nextOrderDate,
            pauseReason: null,
          },
        });
        await tx.subscriptionOrderCycleEvent.create({
          data: {
            subscriptionId: subscription.id,
            cycleDate,
            referenceDate,
            outcome: 'skipped',
            reason: 'order_already_exists',
            attempt,
          },
        });
        return 'skipped';
      }

      const reservation = await tx.inventoryReservation.findFirst({
        where: {
          subscriptionId: subscription.id,
          cycleDate,
          status: 'reserved',
        },
      });
      if (!reservation) {
        await tx.subscription.update({
          where: { id: subscription.id },
          data: { status: 'paused', pauseReason: 'capacity_exhausted' },
        });
        await tx.subscriptionOrderCycleEvent.create({
          data: {
            subscriptionId: subscription.id,
            cycleDate,
            referenceDate,
            outcome: 'skipped',
            reason: 'capacity_exhausted',
            attempt,
          },
        });
        return 'skipped';
      }

      const boxId = subscription.boxId ?? subscription.plan.boxId;
      const boxVersion = await tx.boxVersion.findFirst({
        where: {
          boxId,
          startDate: { lte: cycleDate },
          OR: [{ endDate: null }, { endDate: { gte: cycleDate } }],
        },
        orderBy: { startDate: 'desc' },
      });
      if (!boxVersion) {
        await tx.subscription.update({
          where: { id: subscription.id },
          data: { pauseReason: 'no_active_box_version' },
        });
        await tx.subscriptionOrderCycleEvent.create({
          data: {
            subscriptionId: subscription.id,
            cycleDate,
            referenceDate,
            outcome: 'skipped',
            reason: 'no_active_box_version',
            attempt,
          },
        });
        return 'skipped';
      }

      const boxItems = await tx.boxItem.findMany({
        where: { boxVersionId: boxVersion.id },
        include: { product: true },
      });

      const built = this.orderFactory.build({
        customerId: subscription.customerId,
        subscriptionId: subscription.id,
        boxVersionId: boxVersion.id,
        cycleDate,
        items: boxItems.map((item) => ({
          productId: item.productId,
          farmerId: item.farmerId,
          quantity: item.quantity,
          unitPrice: Number(item.product.basePrice),
        })),
      });

      const deliveryDate = addDays(cycleDate, estimateDeliveryDays(subscription.plan.deliveryFrequency));
      const order = await tx.order.create({
        data: {
          ...built.order,
          deliveryDate,
        },
      });
      if (built.orderItems.length > 0) {
        await tx.orderItem.createMany({
          data: built.orderItems.map((item) => ({
            orderId: order.id,
            productId: item.productId,
            farmerId: item.farmerId,
            quantity: item.quantity,
            price: item.price,
          })),
        });
      }

      await tx.delivery.create({
        data: {
          orderId: order.id,
          deliveryStatus: 'scheduled',
          deliveryDriver: null,
          trackingCode: null,
          deliveredAt: null,
        },
      });

      await tx.inventoryReservation.update({
        where: { id: reservation.id },
        data: { status: 'consumed' },
      });
      await tx.capacitySnapshot.update({
        where: { id: reservation.capacitySnapshotId },
        data: {
          consumedBoxes: { increment: 1 },
          reservedBoxes: { decrement: 1 },
        },
      });

      const nextOrderDate = this.cycleDateCalculator.addCycle(cycleDate, subscription.plan.deliveryFrequency);
      await tx.subscription.update({
        where: { id: subscription.id },
        data: {
          lastOrderDate: cycleDate,
          nextOrderDate,
          nextDeliveryDate: nextOrderDate,
          pauseReason: null,
        },
      });

      await tx.subscriptionOrderCycleEvent.create({
        data: {
          subscriptionId: subscription.id,
          cycleDate,
          referenceDate,
          outcome: 'created',
          reason: null,
          attempt,
        },
      });

      return 'created';
    });
  }
}

