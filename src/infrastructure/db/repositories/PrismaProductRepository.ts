import type { Product, ProductImage, ProductImageCreateInput } from '../../../domain/products/Product';
import type {
  ProductRepository,
  ProductCreateData,
  ProductUpdateData,
  ProductListByFarmerFilters,
  ProductListFilters,
} from '../../../domain/products/ProductRepository';
import prisma from '../prismaClient';

function mapImage(row: { id: string; imageUrl: string; isPrimary: boolean; sortOrder: number }): ProductImage {
  return {
    id: row.id,
    imageUrl: row.imageUrl,
    isPrimary: row.isPrimary,
    sortOrder: row.sortOrder,
  };
}

function mapRowToProduct(
  row: {
    id: string;
    farmerId: string;
    categoryId: string;
    name: string;
    description: string | null;
    unit: string;
    basePrice: unknown;
    isActive: boolean;
    createdAt: Date;
    images?: { id: string; imageUrl: string; isPrimary: boolean; sortOrder: number }[];
  },
): Product {
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

export class PrismaProductRepository implements ProductRepository {
  async findById(id: string): Promise<Product | null> {
    const row = await prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    });
    if (!row) return null;
    return mapRowToProduct(row);
  }

  async findByIdAndFarmerId(id: string, farmerId: string): Promise<Product | null> {
    const row = await prisma.product.findFirst({
      where: { id, farmerId },
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    });
    if (!row) return null;
    return mapRowToProduct(row);
  }

  async list(
    skip: number,
    take: number,
    filters?: ProductListFilters,
  ): Promise<{ items: Product[]; total: number }> {
    const where: {
      name?: { contains: string; mode: 'insensitive' };
      categoryId?: string;
      isActive?: boolean;
    } = {};
    if (filters?.name?.trim()) where.name = { contains: filters.name.trim(), mode: 'insensitive' };
    if (filters?.categoryId) where.categoryId = filters.categoryId;
    if (filters?.isActive !== undefined) where.isActive = filters.isActive;

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take,
        where: Object.keys(where).length > 0 ? where : undefined,
        orderBy: { createdAt: 'desc' },
        include: { images: { orderBy: { sortOrder: 'asc' } } },
      }),
      Object.keys(where).length > 0 ? prisma.product.count({ where }) : prisma.product.count(),
    ]);
    return {
      items: items.map(mapRowToProduct),
      total,
    };
  }

  async listByFarmerId(
    farmerId: string,
    skip: number,
    take: number,
    filters?: ProductListByFarmerFilters,
  ): Promise<{ items: Product[]; total: number }> {
    const where: { farmerId: string; name?: { contains: string; mode: 'insensitive' }; categoryId?: string; isActive?: boolean } = {
      farmerId,
    };
    if (filters?.name?.trim()) where.name = { contains: filters.name.trim(), mode: 'insensitive' };
    if (filters?.categoryId) where.categoryId = filters.categoryId;
    if (filters?.isActive !== undefined) where.isActive = filters.isActive;

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take,
        where,
        orderBy: { createdAt: 'desc' },
        include: { images: { orderBy: { sortOrder: 'asc' } } },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      items: items.map(mapRowToProduct),
      total,
    };
  }

  async create(data: ProductCreateData, images?: ProductImageCreateInput[]): Promise<Product> {
    const created = await prisma.product.create({
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
      await prisma.productImage.createMany({
        data: images.map((img, i) => ({
          productId: created.id,
          imageUrl: img.imageUrl,
          isPrimary: img.isPrimary ?? i === 0,
          sortOrder: img.sortOrder ?? i,
        })),
      });
    }

    const row = await prisma.product.findUnique({
      where: { id: created.id },
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    });
    if (!row) return mapRowToProduct(created);
    return mapRowToProduct(row);
  }

  async update(id: string, data: ProductUpdateData, images?: ProductImageCreateInput[]): Promise<Product> {
    await prisma.product.update({
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
      await prisma.productImage.deleteMany({ where: { productId: id } });
      if (images.length > 0) {
        await prisma.productImage.createMany({
          data: images.map((img, i) => ({
            productId: id,
            imageUrl: img.imageUrl,
            isPrimary: img.isPrimary ?? i === 0,
            sortOrder: img.sortOrder ?? i,
          })),
        });
      }
    }

    const row = await prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    });
    if (!row) throw new Error('Product not found after update');
    return mapRowToProduct(row);
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
}
