"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerCreateSubscriptionUseCase = void 0;
const logger_1 = require("../../../../core/logging/logger");
const prismaClient_1 = __importDefault(require("../../../../infrastructure/db/prismaClient"));
function addWeeks(date, weeks) {
    const result = new Date(date);
    result.setDate(result.getDate() + weeks * 7);
    return result;
}
function addMonths(date, months) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}
function startOfDay(date) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}
function endOfDay(date) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999));
}
class CustomerCreateSubscriptionUseCase {
    constructor(customerRepository, subscriptionPlanRepository, subscriptionRepository) {
        this.customerRepository = customerRepository;
        this.subscriptionPlanRepository = subscriptionPlanRepository;
        this.subscriptionRepository = subscriptionRepository;
    }
    async execute(userId, input) {
        const customer = await this.customerRepository.findByUserId(userId);
        if (!customer)
            throw new Error('Customer profile not found');
        const plan = await this.subscriptionPlanRepository.findById(input.planId);
        if (!plan)
            throw new Error('Subscription plan not found');
        if (!plan.active)
            throw new Error('Subscription plan is not active');
        const startDate = startOfDay(input.startDate ?? new Date());
        let cycleDate;
        if (plan.deliveryFrequency === 'weekly') {
            cycleDate = addWeeks(startDate, 1);
        }
        else {
            cycleDate = addMonths(startDate, 1);
        }
        cycleDate = startOfDay(cycleDate);
        const idemKey = `${customer.id}:${input.planId}:${cycleDate.toISOString().slice(0, 10)}`;
        logger_1.logger.info('Subscribe+reserve started', {
            userId,
            customerId: customer.id,
            planId: input.planId,
            startDate: startDate.toISOString(),
            cycleDate: cycleDate.toISOString(),
            idempotencyKey: idemKey,
        });
        try {
            const result = await prismaClient_1.default.$transaction(async (tx) => {
                const existing = await tx.inventoryReservation.findUnique({
                    where: { idempotencyKey: idemKey },
                    include: { subscription: true },
                });
                if (existing?.subscription) {
                    logger_1.logger.info('Subscribe+reserve idempotency hit', {
                        customerId: customer.id,
                        planId: input.planId,
                        cycleDate: cycleDate.toISOString(),
                        reservationId: existing.id,
                        subscriptionId: existing.subscription.id,
                    });
                    return {
                        subscription: existing.subscription,
                        reservation: existing,
                    };
                }
                const hasAddress = await tx.address.findFirst({
                    where: { userId },
                    select: { id: true },
                });
                if (!hasAddress) {
                    logger_1.logger.error('Subscribe+reserve rejected: no delivery address', {
                        userId,
                        customerId: customer.id,
                        planId: input.planId,
                    });
                    throw new Error('Delivery address is required. Please add an address in your profile to continue.');
                }
                const activeSubscription = await tx.subscription.findFirst({
                    where: {
                        customerId: customer.id,
                        status: 'active',
                        OR: [{ planId: input.planId }, { plan: { boxId: plan.boxId } }],
                    },
                    select: {
                        id: true,
                        planId: true,
                    },
                });
                if (activeSubscription) {
                    logger_1.logger.error('Subscribe+reserve rejected: active subscription already exists', {
                        customerId: customer.id,
                        requestedPlanId: input.planId,
                        requestedBoxId: plan.boxId,
                        existingSubscriptionId: activeSubscription.id,
                        existingPlanId: activeSubscription.planId,
                    });
                    throw new Error('You already have an active subscription for this plan/box');
                }
                const boxVersion = await tx.boxVersion.findFirst({
                    where: {
                        boxId: plan.boxId,
                        startDate: { lte: cycleDate },
                        OR: [{ endDate: null }, { endDate: { gte: cycleDate } }],
                    },
                    orderBy: { startDate: 'desc' },
                });
                if (!boxVersion) {
                    logger_1.logger.error('Subscribe+reserve failed: no active box version', {
                        customerId: customer.id,
                        planId: input.planId,
                        boxId: plan.boxId,
                        cycleDate: cycleDate.toISOString(),
                    });
                    throw new Error('No active box version found for the selected cycle');
                }
                let snapshot = await tx.capacitySnapshot.findUnique({
                    where: { boxVersionId_cycleDate: { boxVersionId: boxVersion.id, cycleDate } },
                });
                if (!snapshot) {
                    const boxItems = await tx.boxItem.findMany({ where: { boxVersionId: boxVersion.id, optional: false } });
                    let maxBoxes = 0;
                    const itemCaps = [];
                    if (boxItems.length > 0) {
                        const caps = [];
                        for (const item of boxItems) {
                            const agg = await tx.harvest.aggregate({
                                where: {
                                    farmerId: item.farmerId,
                                    productId: item.productId,
                                    status: 'approved',
                                    harvestDate: { lte: endOfDay(cycleDate) },
                                    availableUntil: { gte: startOfDay(cycleDate) },
                                },
                                _sum: { quantityAvailable: true },
                            });
                            const totalAvailable = agg._sum.quantityAvailable ?? 0;
                            const cap = Math.floor(totalAvailable / item.quantity);
                            caps.push(cap);
                            itemCaps.push({
                                boxItemId: item.id,
                                farmerId: item.farmerId,
                                productId: item.productId,
                                quantityPerBox: item.quantity,
                                totalAvailable,
                                cap,
                            });
                        }
                        maxBoxes = Math.max(0, Math.min(...caps));
                    }
                    logger_1.logger.info('Capacity snapshot computed in subscribe flow', {
                        customerId: customer.id,
                        planId: input.planId,
                        boxVersionId: boxVersion.id,
                        cycleDate: cycleDate.toISOString(),
                        requiredItemCount: boxItems.length,
                        maxBoxes,
                        itemCaps,
                    });
                    snapshot = await tx.capacitySnapshot.create({
                        data: {
                            boxVersionId: boxVersion.id,
                            cycleDate,
                            maxBoxes,
                        },
                    });
                }
                const lockedRows = await tx.$queryRaw `SELECT id, max_boxes, reserved_boxes, consumed_boxes, status
           FROM capacity_snapshots
           WHERE id = ${snapshot.id}
           FOR UPDATE`;
                const locked = lockedRows[0];
                if (!locked)
                    throw new Error('Capacity snapshot not found');
                if (locked.status !== 'open') {
                    logger_1.logger.error('Subscribe+reserve rejected: snapshot not open', {
                        customerId: customer.id,
                        planId: input.planId,
                        boxVersionId: boxVersion.id,
                        cycleDate: cycleDate.toISOString(),
                        snapshotId: locked.id,
                        snapshotStatus: locked.status,
                    });
                    throw new Error('Capacity is not open for reservation');
                }
                const remaining = locked.max_boxes - locked.reserved_boxes - locked.consumed_boxes;
                if (remaining < 1) {
                    logger_1.logger.error('Subscribe+reserve rejected: capacity exhausted', {
                        customerId: customer.id,
                        planId: input.planId,
                        boxVersionId: boxVersion.id,
                        cycleDate: cycleDate.toISOString(),
                        snapshotId: locked.id,
                        maxBoxes: locked.max_boxes,
                        reservedBoxes: locked.reserved_boxes,
                        consumedBoxes: locked.consumed_boxes,
                        remaining,
                    });
                    throw new Error('Capacity exhausted for this cycle');
                }
                const subscription = await tx.subscription.create({
                    data: {
                        customerId: customer.id,
                        planId: input.planId,
                        boxId: plan.boxId,
                        status: 'active',
                        startDate,
                        nextDeliveryDate: cycleDate,
                        nextOrderDate: cycleDate,
                        lastOrderDate: null,
                        pauseReason: null,
                        pauseUntil: null,
                    },
                });
                const reservation = await tx.inventoryReservation.create({
                    data: {
                        subscriptionId: subscription.id,
                        boxVersionId: boxVersion.id,
                        capacitySnapshotId: snapshot.id,
                        cycleDate,
                        quantity: 1,
                        status: 'reserved',
                        idempotencyKey: idemKey,
                    },
                });
                await tx.capacitySnapshot.update({
                    where: { id: snapshot.id },
                    data: { reservedBoxes: { increment: 1 } },
                });
                logger_1.logger.info('Subscribe+reserve committed', {
                    customerId: customer.id,
                    planId: input.planId,
                    boxVersionId: boxVersion.id,
                    cycleDate: cycleDate.toISOString(),
                    subscriptionId: subscription.id,
                    reservationId: reservation.id,
                    snapshotId: snapshot.id,
                });
                return { subscription, reservation };
            });
            return {
                ...result.subscription,
                reservation: {
                    id: result.reservation.id,
                    cycleDate: result.reservation.cycleDate,
                    status: result.reservation.status,
                    idempotencyKey: result.reservation.idempotencyKey,
                },
            };
        }
        catch (error) {
            logger_1.logger.error('Subscribe+reserve failed', {
                userId,
                customerId: customer.id,
                planId: input.planId,
                cycleDate: cycleDate.toISOString(),
                idempotencyKey: idemKey,
                error: error instanceof Error ? error.message : String(error),
            });
            throw error;
        }
    }
}
exports.CustomerCreateSubscriptionUseCase = CustomerCreateSubscriptionUseCase;
//# sourceMappingURL=CustomerCreateSubscriptionUseCase.js.map