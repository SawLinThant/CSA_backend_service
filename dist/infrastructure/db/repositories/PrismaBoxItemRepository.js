"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaBoxItemRepository = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
function mapRowToBoxItem(row) {
    return {
        id: row.id,
        boxVersionId: row.boxVersionId,
        productId: row.productId,
        farmerId: row.farmerId,
        quantity: row.quantity,
        optional: row.optional,
    };
}
class PrismaBoxItemRepository {
    async findById(id) {
        const row = await prismaClient_1.default.boxItem.findUnique({ where: { id } });
        if (!row)
            return null;
        return mapRowToBoxItem(row);
    }
    async listByBoxVersionId(boxVersionId) {
        const rows = await prismaClient_1.default.boxItem.findMany({
            where: { boxVersionId },
            orderBy: { id: 'asc' },
        });
        return rows.map(mapRowToBoxItem);
    }
    async create(data) {
        const row = await prismaClient_1.default.boxItem.create({
            data: {
                boxVersionId: data.boxVersionId,
                productId: data.productId,
                farmerId: data.farmerId,
                quantity: data.quantity,
                optional: data.optional ?? false,
            },
        });
        return mapRowToBoxItem(row);
    }
    async update(id, data) {
        const row = await prismaClient_1.default.boxItem.update({
            where: { id },
            data: {
                ...(data.quantity !== undefined && { quantity: data.quantity }),
                ...(data.optional !== undefined && { optional: data.optional }),
            },
        });
        return mapRowToBoxItem(row);
    }
    async delete(id) {
        await prismaClient_1.default.boxItem.delete({ where: { id } });
    }
}
exports.PrismaBoxItemRepository = PrismaBoxItemRepository;
//# sourceMappingURL=PrismaBoxItemRepository.js.map