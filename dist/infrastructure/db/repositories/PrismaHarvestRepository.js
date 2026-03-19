"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaHarvestRepository = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
function mapRowToHarvest(row) {
    return {
        id: row.id,
        farmerId: row.farmerId,
        productId: row.productId,
        quantityAvailable: row.quantityAvailable,
        unitPrice: Number(row.unitPrice),
        harvestDate: row.harvestDate,
        availableUntil: row.availableUntil,
        status: row.status,
        approvedBy: row.approvedBy,
        approvedAt: row.approvedAt,
        createdAt: row.createdAt,
    };
}
class PrismaHarvestRepository {
    async create(data) {
        const row = await prismaClient_1.default.harvest.create({
            data: {
                farmerId: data.farmerId,
                productId: data.productId,
                quantityAvailable: data.quantityAvailable,
                unitPrice: data.unitPrice,
                harvestDate: data.harvestDate,
                availableUntil: data.availableUntil,
            },
        });
        return mapRowToHarvest(row);
    }
    async findById(id) {
        const row = await prismaClient_1.default.harvest.findUnique({ where: { id } });
        if (!row)
            return null;
        return mapRowToHarvest(row);
    }
    async findByIdAndFarmerId(id, farmerId) {
        const row = await prismaClient_1.default.harvest.findFirst({
            where: { id, farmerId },
        });
        if (!row)
            return null;
        return mapRowToHarvest(row);
    }
    async listByFarmerId(farmerId, skip, take, filters) {
        const where = { farmerId };
        if (filters?.productId)
            where.productId = filters.productId;
        if (filters?.status)
            where.status = filters.status;
        if (filters?.harvestDateFrom !== undefined || filters?.harvestDateTo !== undefined) {
            where.harvestDate = {};
            if (filters.harvestDateFrom !== undefined)
                where.harvestDate.gte = filters.harvestDateFrom;
            if (filters.harvestDateTo !== undefined)
                where.harvestDate.lte = filters.harvestDateTo;
        }
        const [items, total] = await Promise.all([
            prismaClient_1.default.harvest.findMany({
                skip,
                take,
                where,
                orderBy: { createdAt: 'desc' },
            }),
            prismaClient_1.default.harvest.count({ where }),
        ]);
        return {
            items: items.map(mapRowToHarvest),
            total,
        };
    }
    async list(skip, take, filters) {
        const where = {};
        if (filters?.farmerId)
            where.farmerId = filters.farmerId;
        if (filters?.productId)
            where.productId = filters.productId;
        if (filters?.status)
            where.status = filters.status;
        if (filters?.harvestDateFrom !== undefined || filters?.harvestDateTo !== undefined) {
            where.harvestDate = {};
            if (filters.harvestDateFrom !== undefined)
                where.harvestDate.gte = filters.harvestDateFrom;
            if (filters.harvestDateTo !== undefined)
                where.harvestDate.lte = filters.harvestDateTo;
        }
        const hasWhere = Object.keys(where).length > 0;
        const [items, total] = await Promise.all([
            prismaClient_1.default.harvest.findMany({
                skip,
                take,
                ...(hasWhere && { where }),
                orderBy: { createdAt: 'desc' },
            }),
            hasWhere ? prismaClient_1.default.harvest.count({ where }) : prismaClient_1.default.harvest.count(),
        ]);
        return {
            items: items.map(mapRowToHarvest),
            total,
        };
    }
    async update(id, data) {
        const row = await prismaClient_1.default.harvest.update({
            where: { id },
            data: {
                ...(data.quantityAvailable !== undefined && { quantityAvailable: data.quantityAvailable }),
                ...(data.unitPrice !== undefined && { unitPrice: data.unitPrice }),
                ...(data.harvestDate !== undefined && { harvestDate: data.harvestDate }),
                ...(data.availableUntil !== undefined && { availableUntil: data.availableUntil }),
            },
        });
        return mapRowToHarvest(row);
    }
    async setApproval(id, status, approvedBy) {
        const row = await prismaClient_1.default.harvest.update({
            where: { id },
            data: { status, approvedBy, approvedAt: new Date() },
        });
        return mapRowToHarvest(row);
    }
}
exports.PrismaHarvestRepository = PrismaHarvestRepository;
//# sourceMappingURL=PrismaHarvestRepository.js.map