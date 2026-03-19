"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaSubscriptionPlanRepository = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
function mapRowToPlan(row) {
    return {
        id: row.id,
        boxId: row.boxId,
        name: row.name,
        price: Number(row.price),
        deliveryFrequency: row.deliveryFrequency,
        deliveriesPerCycle: row.deliveriesPerCycle,
        active: row.active,
        createdAt: row.createdAt,
    };
}
class PrismaSubscriptionPlanRepository {
    async findById(id) {
        const row = await prismaClient_1.default.subscriptionPlan.findUnique({ where: { id } });
        if (!row)
            return null;
        return mapRowToPlan(row);
    }
    async list(skip, take, filters) {
        const where = {};
        if (filters?.boxId)
            where.boxId = filters.boxId;
        if (filters?.active !== undefined)
            where.active = filters.active;
        const hasWhere = Object.keys(where).length > 0;
        const [items, total] = await Promise.all([
            prismaClient_1.default.subscriptionPlan.findMany({
                skip,
                take,
                ...(hasWhere && { where }),
                orderBy: { createdAt: 'desc' },
            }),
            hasWhere ? prismaClient_1.default.subscriptionPlan.count({ where }) : prismaClient_1.default.subscriptionPlan.count(),
        ]);
        return {
            items: items.map(mapRowToPlan),
            total,
        };
    }
    async create(data) {
        const row = await prismaClient_1.default.subscriptionPlan.create({
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
    async update(id, data) {
        const row = await prismaClient_1.default.subscriptionPlan.update({
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
    async delete(id) {
        await prismaClient_1.default.subscriptionPlan.delete({ where: { id } });
    }
    async countSubscriptionsByPlanId(planId) {
        return prismaClient_1.default.subscription.count({ where: { planId } });
    }
}
exports.PrismaSubscriptionPlanRepository = PrismaSubscriptionPlanRepository;
//# sourceMappingURL=PrismaSubscriptionPlanRepository.js.map