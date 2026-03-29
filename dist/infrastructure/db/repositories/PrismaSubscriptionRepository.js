"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaSubscriptionRepository = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
function mapRowToSubscription(row) {
    return {
        id: row.id,
        customerId: row.customerId,
        planId: row.planId,
        boxId: row.boxId,
        status: row.status,
        startDate: row.startDate,
        nextDeliveryDate: row.nextDeliveryDate,
        nextOrderDate: row.nextOrderDate,
        lastOrderDate: row.lastOrderDate,
        pauseReason: row.pauseReason,
        pauseUntil: row.pauseUntil,
        createdAt: row.createdAt,
    };
}
class PrismaSubscriptionRepository {
    async create(data) {
        const row = await prismaClient_1.default.subscription.create({
            data: {
                customerId: data.customerId,
                planId: data.planId,
                boxId: data.boxId ?? null,
                status: data.status,
                startDate: data.startDate,
                nextDeliveryDate: data.nextDeliveryDate,
                nextOrderDate: data.nextOrderDate ?? null,
                lastOrderDate: data.lastOrderDate ?? null,
                pauseReason: data.pauseReason ?? null,
                pauseUntil: data.pauseUntil ?? null,
            },
        });
        return mapRowToSubscription(row);
    }
    async findById(id) {
        const row = await prismaClient_1.default.subscription.findUnique({ where: { id } });
        if (!row)
            return null;
        return mapRowToSubscription(row);
    }
    async findByIdAndCustomerId(id, customerId) {
        const row = await prismaClient_1.default.subscription.findFirst({
            where: { id, customerId },
        });
        if (!row)
            return null;
        return mapRowToSubscription(row);
    }
    async listByCustomerId(customerId, skip, take, filters) {
        const where = { customerId };
        if (filters?.status)
            where.status = filters.status;
        const [items, total] = await Promise.all([
            prismaClient_1.default.subscription.findMany({
                skip,
                take,
                where,
                orderBy: { createdAt: 'desc' },
            }),
            prismaClient_1.default.subscription.count({ where }),
        ]);
        return {
            items: items.map(mapRowToSubscription),
            total,
        };
    }
    async update(id, data) {
        const row = await prismaClient_1.default.subscription.update({
            where: { id },
            data: {
                ...(data.status !== undefined && { status: data.status }),
                ...(data.nextDeliveryDate !== undefined && { nextDeliveryDate: data.nextDeliveryDate }),
                ...(data.nextOrderDate !== undefined && { nextOrderDate: data.nextOrderDate }),
                ...(data.lastOrderDate !== undefined && { lastOrderDate: data.lastOrderDate }),
                ...(data.pauseReason !== undefined && { pauseReason: data.pauseReason }),
                ...(data.pauseUntil !== undefined && { pauseUntil: data.pauseUntil }),
            },
        });
        return mapRowToSubscription(row);
    }
}
exports.PrismaSubscriptionRepository = PrismaSubscriptionRepository;
//# sourceMappingURL=PrismaSubscriptionRepository.js.map