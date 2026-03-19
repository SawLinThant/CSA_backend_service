"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaBoxRepository = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
function mapRowToBox(row) {
    return {
        id: row.id,
        name: row.name,
        description: row.description,
        imageUrl: row.imageUrl,
        isActive: row.isActive,
        createdAt: row.createdAt,
    };
}
class PrismaBoxRepository {
    async findById(id) {
        const row = await prismaClient_1.default.box.findUnique({ where: { id } });
        if (!row)
            return null;
        return mapRowToBox(row);
    }
    async list(skip, take, filters) {
        const where = {};
        if (filters?.name?.trim())
            where.name = { contains: filters.name.trim(), mode: 'insensitive' };
        if (filters?.isActive !== undefined)
            where.isActive = filters.isActive;
        const hasWhere = Object.keys(where).length > 0;
        const [items, total] = await Promise.all([
            prismaClient_1.default.box.findMany({
                skip,
                take,
                ...(hasWhere && { where }),
                orderBy: { createdAt: 'desc' },
            }),
            hasWhere ? prismaClient_1.default.box.count({ where }) : prismaClient_1.default.box.count(),
        ]);
        return {
            items: items.map(mapRowToBox),
            total,
        };
    }
    async create(data) {
        const row = await prismaClient_1.default.box.create({
            data: {
                name: data.name,
                description: data.description ?? null,
                imageUrl: data.imageUrl ?? null,
                isActive: data.isActive ?? true,
            },
        });
        return mapRowToBox(row);
    }
    async update(id, data) {
        const row = await prismaClient_1.default.box.update({
            where: { id },
            data: {
                ...(data.name !== undefined && { name: data.name }),
                ...(data.description !== undefined && { description: data.description }),
                ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
                ...(data.isActive !== undefined && { isActive: data.isActive }),
            },
        });
        return mapRowToBox(row);
    }
    async delete(id) {
        await prismaClient_1.default.box.delete({ where: { id } });
    }
}
exports.PrismaBoxRepository = PrismaBoxRepository;
//# sourceMappingURL=PrismaBoxRepository.js.map