"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCapacitySnapshotRepository = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
function mapRow(row) {
    return {
        id: row.id,
        boxVersionId: row.boxVersionId,
        cycleDate: row.cycleDate,
        maxBoxes: row.maxBoxes,
        reservedBoxes: row.reservedBoxes,
        consumedBoxes: row.consumedBoxes,
        status: row.status,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}
function mapListRow(row) {
    return {
        ...mapRow(row),
        boxVersionName: row.boxVersion.versionName,
    };
}
class PrismaCapacitySnapshotRepository {
    async findById(id) {
        const row = await prismaClient_1.default.capacitySnapshot.findUnique({ where: { id } });
        return row ? mapRow(row) : null;
    }
    async findByBoxVersionAndCycleDate(boxVersionId, cycleDate) {
        const row = await prismaClient_1.default.capacitySnapshot.findUnique({
            where: { boxVersionId_cycleDate: { boxVersionId, cycleDate } },
        });
        return row ? mapRow(row) : null;
    }
    async create(data) {
        const row = await prismaClient_1.default.capacitySnapshot.create({
            data: {
                boxVersionId: data.boxVersionId,
                cycleDate: data.cycleDate,
                maxBoxes: data.maxBoxes,
                status: data.status ?? 'open',
            },
        });
        return mapRow(row);
    }
    async upsertForCycle(data) {
        const row = await prismaClient_1.default.capacitySnapshot.upsert({
            where: { boxVersionId_cycleDate: { boxVersionId: data.boxVersionId, cycleDate: data.cycleDate } },
            create: {
                boxVersionId: data.boxVersionId,
                cycleDate: data.cycleDate,
                maxBoxes: data.maxBoxes,
                status: data.status ?? 'open',
            },
            update: {
                maxBoxes: data.maxBoxes,
                ...(data.status !== undefined && { status: data.status }),
            },
        });
        return mapRow(row);
    }
    async update(id, data) {
        const row = await prismaClient_1.default.capacitySnapshot.update({
            where: { id },
            data: {
                ...(data.maxBoxes !== undefined && { maxBoxes: data.maxBoxes }),
                ...(data.reservedBoxes !== undefined && { reservedBoxes: data.reservedBoxes }),
                ...(data.consumedBoxes !== undefined && { consumedBoxes: data.consumedBoxes }),
                ...(data.status !== undefined && { status: data.status }),
            },
        });
        return mapRow(row);
    }
    async incrementReserved(id, by) {
        const row = await prismaClient_1.default.capacitySnapshot.update({
            where: { id },
            data: { reservedBoxes: { increment: by } },
        });
        return mapRow(row);
    }
    async incrementConsumed(id, by) {
        const row = await prismaClient_1.default.capacitySnapshot.update({
            where: { id },
            data: { consumedBoxes: { increment: by } },
        });
        return mapRow(row);
    }
    async list(skip, take, filters) {
        const where = {};
        if (filters?.boxVersionId)
            where.boxVersionId = filters.boxVersionId;
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
            prismaClient_1.default.capacitySnapshot.findMany({
                skip,
                take,
                ...(hasWhere && { where }),
                orderBy: { cycleDate: 'asc' },
                include: {
                    boxVersion: { select: { versionName: true } },
                },
            }),
            hasWhere ? prismaClient_1.default.capacitySnapshot.count({ where }) : prismaClient_1.default.capacitySnapshot.count(),
        ]);
        return { items: items.map(mapListRow), total };
    }
}
exports.PrismaCapacitySnapshotRepository = PrismaCapacitySnapshotRepository;
//# sourceMappingURL=PrismaCapacitySnapshotRepository.js.map