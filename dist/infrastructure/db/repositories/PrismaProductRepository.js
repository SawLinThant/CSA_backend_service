"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProductRepository = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
function mapImage(row) {
    return {
        id: row.id,
        imageUrl: row.imageUrl,
        isPrimary: row.isPrimary,
        sortOrder: row.sortOrder,
    };
}
function mapRowToProduct(row) {
    return {
        id: row.id,
        farmerId: row.farmerId,
        categoryId: row.categoryId,
        name: row.name,
        description: row.description,
        unit: row.unit,
        basePrice: Number(row.basePrice),
        isActive: row.isActive,
        createdAt: row.createdAt,
        ...(row.images && { images: row.images.map(mapImage) }),
    };
}
class PrismaProductRepository {
    async findById(id) {
        const row = await prismaClient_1.default.product.findUnique({
            where: { id },
            include: { images: { orderBy: { sortOrder: 'asc' } } },
        });
        if (!row)
            return null;
        return mapRowToProduct(row);
    }
    async findByIdAndFarmerId(id, farmerId) {
        const row = await prismaClient_1.default.product.findFirst({
            where: { id, farmerId },
            include: { images: { orderBy: { sortOrder: 'asc' } } },
        });
        if (!row)
            return null;
        return mapRowToProduct(row);
    }
    async list(skip, take, filters) {
        const where = {};
        if (filters?.name?.trim())
            where.name = { contains: filters.name.trim(), mode: 'insensitive' };
        if (filters?.categoryId)
            where.categoryId = filters.categoryId;
        if (filters?.isActive !== undefined)
            where.isActive = filters.isActive;
        const [items, total] = await Promise.all([
            prismaClient_1.default.product.findMany({
                skip,
                take,
                ...(Object.keys(where).length > 0 && { where }),
                orderBy: { createdAt: 'desc' },
                include: { images: { orderBy: { sortOrder: 'asc' } } },
            }),
            Object.keys(where).length > 0 ? prismaClient_1.default.product.count({ where }) : prismaClient_1.default.product.count(),
        ]);
        return {
            items: items.map(mapRowToProduct),
            total,
        };
    }
    async listByFarmerId(farmerId, skip, take, filters) {
        const where = {
            farmerId,
        };
        if (filters?.name?.trim())
            where.name = { contains: filters.name.trim(), mode: 'insensitive' };
        if (filters?.categoryId)
            where.categoryId = filters.categoryId;
        if (filters?.isActive !== undefined)
            where.isActive = filters.isActive;
        const [items, total] = await Promise.all([
            prismaClient_1.default.product.findMany({
                skip,
                take,
                where,
                orderBy: { createdAt: 'desc' },
                include: { images: { orderBy: { sortOrder: 'asc' } } },
            }),
            prismaClient_1.default.product.count({ where }),
        ]);
        return {
            items: items.map(mapRowToProduct),
            total,
        };
    }
    async create(data, images) {
        const created = await prismaClient_1.default.product.create({
            data: {
                farmerId: data.farmerId,
                categoryId: data.categoryId,
                name: data.name,
                description: data.description ?? null,
                unit: data.unit,
                basePrice: data.basePrice,
                isActive: data.isActive ?? true,
            },
        });
        if (images && images.length > 0) {
            await prismaClient_1.default.productImage.createMany({
                data: images.map((img, i) => ({
                    productId: created.id,
                    imageUrl: img.imageUrl,
                    isPrimary: img.isPrimary ?? i === 0,
                    sortOrder: img.sortOrder ?? i,
                })),
            });
        }
        const row = await prismaClient_1.default.product.findUnique({
            where: { id: created.id },
            include: { images: { orderBy: { sortOrder: 'asc' } } },
        });
        if (!row)
            return mapRowToProduct(created);
        return mapRowToProduct(row);
    }
    async update(id, data, images) {
        await prismaClient_1.default.product.update({
            where: { id },
            data: {
                ...(data.name !== undefined && { name: data.name }),
                ...(data.description !== undefined && { description: data.description }),
                ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
                ...(data.unit !== undefined && { unit: data.unit }),
                ...(data.basePrice !== undefined && { basePrice: data.basePrice }),
                ...(data.isActive !== undefined && { isActive: data.isActive }),
            },
        });
        if (images !== undefined) {
            await prismaClient_1.default.productImage.deleteMany({ where: { productId: id } });
            if (images.length > 0) {
                await prismaClient_1.default.productImage.createMany({
                    data: images.map((img, i) => ({
                        productId: id,
                        imageUrl: img.imageUrl,
                        isPrimary: img.isPrimary ?? i === 0,
                        sortOrder: img.sortOrder ?? i,
                    })),
                });
            }
        }
        const row = await prismaClient_1.default.product.findUnique({
            where: { id },
            include: { images: { orderBy: { sortOrder: 'asc' } } },
        });
        if (!row)
            throw new Error('Product not found after update');
        return mapRowToProduct(row);
    }
    async delete(id) {
        await prismaClient_1.default.product.delete({ where: { id } });
    }
}
exports.PrismaProductRepository = PrismaProductRepository;
//# sourceMappingURL=PrismaProductRepository.js.map