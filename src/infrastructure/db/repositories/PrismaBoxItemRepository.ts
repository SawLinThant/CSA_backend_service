import type { BoxItem } from '../../../domain/boxes/BoxItem';
import type {
  BoxItemRepository,
  BoxItemCreateData,
  BoxItemUpdateData,
} from '../../../domain/boxes/BoxItemRepository';
import prisma from '../prismaClient';

function mapRowToBoxItem(row: {
  id: string;
  boxVersionId: string;
  productId: string;
  farmerId: string;
  quantity: number;
  optional: boolean;
}): BoxItem {
  return {
    id: row.id,
    boxVersionId: row.boxVersionId,
    productId: row.productId,
    farmerId: row.farmerId,
    quantity: row.quantity,
    optional: row.optional,
  };
}

export class PrismaBoxItemRepository implements BoxItemRepository {
  async findById(id: string): Promise<BoxItem | null> {
    const row = await prisma.boxItem.findUnique({ where: { id } });
    if (!row) return null;
    return mapRowToBoxItem(row);
  }

  async listByBoxVersionId(boxVersionId: string): Promise<BoxItem[]> {
    const rows = await prisma.boxItem.findMany({
      where: { boxVersionId },
      orderBy: { id: 'asc' },
    });
    return rows.map(mapRowToBoxItem);
  }

  async create(data: BoxItemCreateData): Promise<BoxItem> {
    const row = await prisma.boxItem.create({
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

  async update(id: string, data: BoxItemUpdateData): Promise<BoxItem> {
    const row = await prisma.boxItem.update({
      where: { id },
      data: {
        ...(data.quantity !== undefined && { quantity: data.quantity }),
        ...(data.optional !== undefined && { optional: data.optional }),
      },
    });
    return mapRowToBoxItem(row);
  }

  async delete(id: string): Promise<void> {
    await prisma.boxItem.delete({ where: { id } });
  }
}
