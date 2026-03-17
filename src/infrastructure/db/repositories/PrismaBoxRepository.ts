import type { Box } from '../../../domain/boxes/Box';
import type {
  BoxRepository,
  BoxCreateData,
  BoxUpdateData,
  BoxListFilters,
} from '../../../domain/boxes/BoxRepository';
import prisma from '../prismaClient';

function mapRowToBox(row: {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: Date;
}): Box {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    imageUrl: row.imageUrl,
    isActive: row.isActive,
    createdAt: row.createdAt,
  };
}

export class PrismaBoxRepository implements BoxRepository {
  async findById(id: string): Promise<Box | null> {
    const row = await prisma.box.findUnique({ where: { id } });
    if (!row) return null;
    return mapRowToBox(row);
  }

  async list(skip: number, take: number, filters?: BoxListFilters): Promise<{ items: Box[]; total: number }> {
    const where: { name?: { contains: string; mode: 'insensitive' }; isActive?: boolean } = {};
    if (filters?.name?.trim()) where.name = { contains: filters.name.trim(), mode: 'insensitive' };
    if (filters?.isActive !== undefined) where.isActive = filters.isActive;
    const hasWhere = Object.keys(where).length > 0;

    const [items, total] = await Promise.all([
      prisma.box.findMany({
        skip,
        take,
        ...(hasWhere && { where }),
        orderBy: { createdAt: 'desc' },
      }),
      hasWhere ? prisma.box.count({ where }) : prisma.box.count(),
    ]);
    return {
      items: items.map(mapRowToBox),
      total,
    };
  }

  async create(data: BoxCreateData): Promise<Box> {
    const row = await prisma.box.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        imageUrl: data.imageUrl ?? null,
        isActive: data.isActive ?? true,
      },
    });
    return mapRowToBox(row);
  }

  async update(id: string, data: BoxUpdateData): Promise<Box> {
    const row = await prisma.box.update({
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

  async delete(id: string): Promise<void> {
    await prisma.box.delete({ where: { id } });
  }
}
