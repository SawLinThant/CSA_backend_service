"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCategoryRepository = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
function mapRowToCategory(row) {
    return {
        id: row.id,
        name: row.name,
        description: row.description,
    };
}
class PrismaCategoryRepository {
    async findById(id) {
        const row = await prismaClient_1.default.category.findUnique({ where: { id } });
        if (!row)
            return null;
        return mapRowToCategory(row);
    }
    async findByName(name) {
        const row = await prismaClient_1.default.category.findFirst({
            where: { name: { equals: name, mode: 'insensitive' } },
        });
        if (!row)
            return null;
        return mapRowToCategory(row);
    }
    async list(skip, take, filters) {
        const where = filters?.name?.trim()
            ? { name: { contains: filters.name.trim(), mode: 'insensitive' } }
            : undefined;
        const [items, total] = await Promise.all([
            prismaClient_1.default.category.findMany({
                skip,
                take,
                orderBy: { name: 'asc' },
                ...(where && { where }),
            }),
            where ? prismaClient_1.default.category.count({ where }) : prismaClient_1.default.category.count(),
        ]);
        return {
            items: items.map(mapRowToCategory),
            total,
        };
    }
    async create(data) {
        const row = await prismaClient_1.default.category.create({
            data: {
                name: data.name,
                description: data.description ?? null,
            },
        });
        return mapRowToCategory(row);
    }
    async update(id, data) {
        const row = await prismaClient_1.default.category.update({
            where: { id },
            data: {
                ...(data.name !== undefined && { name: data.name }),
                ...(data.description !== undefined && { description: data.description }),
            },
        });
        return mapRowToCategory(row);
    }
    async delete(id) {
        await prismaClient_1.default.category.delete({ where: { id } });
    }
}
exports.PrismaCategoryRepository = PrismaCategoryRepository;
//# sourceMappingURL=PrismaCategoryRepository.js.map