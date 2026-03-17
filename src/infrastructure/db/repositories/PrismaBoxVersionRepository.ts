import type { BoxVersion } from '../../../domain/boxes/BoxVersion';
import type {
  BoxVersionRepository,
  BoxVersionCreateData,
  BoxVersionUpdateData,
  BoxVersionListFilters,
} from '../../../domain/boxes/BoxVersionRepository';
import prisma from '../prismaClient';

function mapRowToBoxVersion(row: {
  id: string;
  boxId: string;
  versionName: string;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
}): BoxVersion {
  return {
    id: row.id,
    boxId: row.boxId,
    versionName: row.versionName,
    startDate: row.startDate,
    endDate: row.endDate,
    createdAt: row.createdAt,
  };
}

export class PrismaBoxVersionRepository implements BoxVersionRepository {
  async findById(id: string): Promise<BoxVersion | null> {
    const row = await prisma.boxVersion.findUnique({ where: { id } });
    if (!row) return null;
    return mapRowToBoxVersion(row);
  }

  async list(
    skip: number,
    take: number,
    filters?: BoxVersionListFilters,
  ): Promise<{ items: BoxVersion[]; total: number }> {
    const where: { boxId?: string } = {};
    if (filters?.boxId) where.boxId = filters.boxId;
    const hasWhere = Object.keys(where).length > 0;

    const [items, total] = await Promise.all([
      prisma.boxVersion.findMany({
        skip,
        take,
        ...(hasWhere && { where }),
        orderBy: { startDate: 'desc' },
      }),
      hasWhere ? prisma.boxVersion.count({ where }) : prisma.boxVersion.count(),
    ]);
    return {
      items: items.map(mapRowToBoxVersion),
      total,
    };
  }

  async create(data: BoxVersionCreateData): Promise<BoxVersion> {
    const row = await prisma.boxVersion.create({
      data: {
        boxId: data.boxId,
        versionName: data.versionName,
        startDate: data.startDate,
        endDate: data.endDate ?? null,
      },
    });
    return mapRowToBoxVersion(row);
  }

  async update(id: string, data: BoxVersionUpdateData): Promise<BoxVersion> {
    const row = await prisma.boxVersion.update({
      where: { id },
      data: {
        ...(data.versionName !== undefined && { versionName: data.versionName }),
        ...(data.startDate !== undefined && { startDate: data.startDate }),
        ...(data.endDate !== undefined && { endDate: data.endDate }),
      },
    });
    return mapRowToBoxVersion(row);
  }

  async delete(id: string): Promise<void> {
    await prisma.boxVersion.delete({ where: { id } });
  }
}
