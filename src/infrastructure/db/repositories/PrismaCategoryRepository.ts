import type { Category } from '../../../domain/categories/Category';
import type {
  CategoryRepository,
  CategoryCreateData,
  CategoryUpdateData,
  CategoryListFilters,
} from '../../../domain/categories/CategoryRepository';
import prisma from '../prismaClient';

function mapRowToCategory(row: { id: string; name: string; description: string | null }): Category {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
  };
}

export class PrismaCategoryRepository implements CategoryRepository {
  async findById(id: string): Promise<Category | null> {
    const row = await prisma.category.findUnique({ where: { id } });
    if (!row) return null;
    return mapRowToCategory(row);
  }

  async findByName(name: string): Promise<Category | null> {
    const row = await prisma.category.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    });
    if (!row) return null;
    return mapRowToCategory(row);
  }

  async list(
    skip: number,
    take: number,
    filters?: CategoryListFilters,
  ): Promise<{ items: Category[]; total: number }> {
    const where = filters?.name?.trim()
      ? { name: { contains: filters.name.trim(), mode: 'insensitive' as const } }
      : undefined;
    const [items, total] = await Promise.all([
      prisma.category.findMany({
        skip,
        take,
        orderBy: { name: 'asc' },
        ...(where && { where }),
      }),
      where ? prisma.category.count({ where }) : prisma.category.count(),
    ]);
    return {
      items: items.map(mapRowToCategory),
      total,
    };
  }

  async create(data: CategoryCreateData): Promise<Category> {
    const row = await prisma.category.create({
      data: {
        name: data.name,
        description: data.description ?? null,
      },
    });
    return mapRowToCategory(row);
  }

  async update(id: string, data: CategoryUpdateData): Promise<Category> {
    const row = await prisma.category.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
      },
    });
    return mapRowToCategory(row);
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({ where: { id } });
  }
}
