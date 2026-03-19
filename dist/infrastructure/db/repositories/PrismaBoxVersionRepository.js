"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaBoxVersionRepository = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
function mapRowToBoxVersion(row) {
    return {
        id: row.id,
        boxId: row.boxId,
        versionName: row.versionName,
        startDate: row.startDate,
        endDate: row.endDate,
        createdAt: row.createdAt,
    };
}
class PrismaBoxVersionRepository {
    async findById(id) {
        const row = await prismaClient_1.default.boxVersion.findUnique({ where: { id } });
        if (!row)
            return null;
        return mapRowToBoxVersion(row);
    }
    async list(skip, take, filters) {
        const where = {};
        if (filters?.boxId)
            where.boxId = filters.boxId;
        const hasWhere = Object.keys(where).length > 0;
        const [items, total] = await Promise.all([
            prismaClient_1.default.boxVersion.findMany({
                skip,
                take,
                ...(hasWhere && { where }),
                orderBy: { startDate: 'desc' },
            }),
            hasWhere ? prismaClient_1.default.boxVersion.count({ where }) : prismaClient_1.default.boxVersion.count(),
        ]);
        return {
            items: items.map(mapRowToBoxVersion),
            total,
        };
    }
    async create(data) {
        const row = await prismaClient_1.default.boxVersion.create({
            data: {
                boxId: data.boxId,
                versionName: data.versionName,
                startDate: data.startDate,
                endDate: data.endDate ?? null,
            },
        });
        return mapRowToBoxVersion(row);
    }
    async update(id, data) {
        const row = await prismaClient_1.default.boxVersion.update({
            where: { id },
            data: {
                ...(data.versionName !== undefined && { versionName: data.versionName }),
                ...(data.startDate !== undefined && { startDate: data.startDate }),
                ...(data.endDate !== undefined && { endDate: data.endDate }),
            },
        });
        return mapRowToBoxVersion(row);
    }
    async delete(id) {
        await prismaClient_1.default.boxVersion.delete({ where: { id } });
    }
}
exports.PrismaBoxVersionRepository = PrismaBoxVersionRepository;
//# sourceMappingURL=PrismaBoxVersionRepository.js.map