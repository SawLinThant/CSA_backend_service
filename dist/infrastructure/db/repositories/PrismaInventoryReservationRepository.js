"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaInventoryReservationRepository = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
function mapRow(row) {
    return {
        id: row.id,
        subscriptionId: row.subscriptionId,
        boxVersionId: row.boxVersionId,
        capacitySnapshotId: row.capacitySnapshotId,
        cycleDate: row.cycleDate,
        quantity: row.quantity,
        status: row.status,
        reason: row.reason,
        idempotencyKey: row.idempotencyKey,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}
class PrismaInventoryReservationRepository {
    async findById(id) {
        const row = await prismaClient_1.default.inventoryReservation.findUnique({ where: { id } });
        return row ? mapRow(row) : null;
    }
    async findBySubscriptionAndCycleDate(subscriptionId, cycleDate) {
        const row = await prismaClient_1.default.inventoryReservation.findUnique({
            where: { subscriptionId_cycleDate: { subscriptionId, cycleDate } },
        });
        return row ? mapRow(row) : null;
    }
    async findByIdempotencyKey(idempotencyKey) {
        const row = await prismaClient_1.default.inventoryReservation.findUnique({ where: { idempotencyKey } });
        return row ? mapRow(row) : null;
    }
    async create(data) {
        const row = await prismaClient_1.default.inventoryReservation.create({
            data: {
                subscriptionId: data.subscriptionId,
                boxVersionId: data.boxVersionId,
                capacitySnapshotId: data.capacitySnapshotId,
                cycleDate: data.cycleDate,
                quantity: data.quantity ?? 1,
                status: data.status ?? 'reserved',
                reason: data.reason ?? null,
                idempotencyKey: data.idempotencyKey,
            },
        });
        return mapRow(row);
    }
    async update(id, data) {
        const row = await prismaClient_1.default.inventoryReservation.update({
            where: { id },
            data: {
                ...(data.status !== undefined && { status: data.status }),
                ...(data.reason !== undefined && { reason: data.reason }),
            },
        });
        return mapRow(row);
    }
    async list(skip, take, filters) {
        const where = {};
        if (filters?.status)
            where.status = filters.status;
        if (filters?.cycleDateFrom !== undefined || filters?.cycleDateTo !== undefined) {
            where.cycleDate = {};
            if (filters.cycleDateFrom !== undefined)
                where.cycleDate.gte = filters.cycleDateFrom;
            if (filters.cycleDateTo !== undefined)
                where.cycleDate.lte = filters.cycleDateTo;
        }
        const hasWhere = Object.keys(where).length > 0;
        const [items, total] = await Promise.all([
            prismaClient_1.default.inventoryReservation.findMany({
                skip,
                take,
                ...(hasWhere && { where }),
                orderBy: [{ cycleDate: 'asc' }, { createdAt: 'asc' }],
            }),
            hasWhere ? prismaClient_1.default.inventoryReservation.count({ where }) : prismaClient_1.default.inventoryReservation.count(),
        ]);
        return { items: items.map(mapRow), total };
    }
}
exports.PrismaInventoryReservationRepository = PrismaInventoryReservationRepository;
//# sourceMappingURL=PrismaInventoryReservationRepository.js.map