import type { CapacitySnapshot, CapacitySnapshotListItem, CapacityStatus } from '../../../domain/capacity/CapacitySnapshot';
import type {
  CapacitySnapshotRepository,
  CapacitySnapshotCreateData,
  CapacitySnapshotUpdateData,
  CapacitySnapshotListFilters,
} from '../../../domain/capacity/CapacitySnapshotRepository';
import prisma from '../prismaClient';

function mapRow(row: {
  id: string;
  boxVersionId: string;
  cycleDate: Date;
  maxBoxes: number;
  reservedBoxes: number;
  consumedBoxes: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}): CapacitySnapshot {
  return {
    id: row.id,
    boxVersionId: row.boxVersionId,
    cycleDate: row.cycleDate,
    maxBoxes: row.maxBoxes,
    reservedBoxes: row.reservedBoxes,
    consumedBoxes: row.consumedBoxes,
    status: row.status as CapacityStatus,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function mapListRow(
  row: {
    id: string;
    boxVersionId: string;
    cycleDate: Date;
    maxBoxes: number;
    reservedBoxes: number;
    consumedBoxes: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    boxVersion: { versionName: string };
  },
): CapacitySnapshotListItem {
  return {
    ...mapRow(row),
    boxVersionName: row.boxVersion.versionName,
  };
}

export class PrismaCapacitySnapshotRepository implements CapacitySnapshotRepository {
  async findById(id: string): Promise<CapacitySnapshot | null> {
    const row = await prisma.capacitySnapshot.findUnique({ where: { id } });
    return row ? mapRow(row) : null;
  }

  async findByBoxVersionAndCycleDate(boxVersionId: string, cycleDate: Date): Promise<CapacitySnapshot | null> {
    const row = await prisma.capacitySnapshot.findUnique({
      where: { boxVersionId_cycleDate: { boxVersionId, cycleDate } },
    });
    return row ? mapRow(row) : null;
  }

  async create(data: CapacitySnapshotCreateData): Promise<CapacitySnapshot> {
    const row = await prisma.capacitySnapshot.create({
      data: {
        boxVersionId: data.boxVersionId,
        cycleDate: data.cycleDate,
        maxBoxes: data.maxBoxes,
        status: data.status ?? 'open',
      },
    });
    return mapRow(row);
  }

  async upsertForCycle(data: CapacitySnapshotCreateData): Promise<CapacitySnapshot> {
    const row = await prisma.capacitySnapshot.upsert({
      where: { boxVersionId_cycleDate: { boxVersionId: data.boxVersionId, cycleDate: data.cycleDate } },
      create: {
        boxVersionId: data.boxVersionId,
        cycleDate: data.cycleDate,
        maxBoxes: data.maxBoxes,
        status: data.status ?? 'open',
      },
      update: {
        maxBoxes: data.maxBoxes,
        ...(data.status !== undefined && { status: data.status }),
      },
    });
    return mapRow(row);
  }

  async update(id: string, data: CapacitySnapshotUpdateData): Promise<CapacitySnapshot> {
    const row = await prisma.capacitySnapshot.update({
      where: { id },
      data: {
        ...(data.maxBoxes !== undefined && { maxBoxes: data.maxBoxes }),
        ...(data.reservedBoxes !== undefined && { reservedBoxes: data.reservedBoxes }),
        ...(data.consumedBoxes !== undefined && { consumedBoxes: data.consumedBoxes }),
        ...(data.status !== undefined && { status: data.status }),
      },
    });
    return mapRow(row);
  }

  async incrementReserved(id: string, by: number): Promise<CapacitySnapshot> {
    const row = await prisma.capacitySnapshot.update({
      where: { id },
      data: { reservedBoxes: { increment: by } },
    });
    return mapRow(row);
  }

  async incrementConsumed(id: string, by: number): Promise<CapacitySnapshot> {
    const row = await prisma.capacitySnapshot.update({
      where: { id },
      data: { consumedBoxes: { increment: by } },
    });
    return mapRow(row);
  }

  async list(
    skip: number,
    take: number,
    filters?: CapacitySnapshotListFilters,
  ): Promise<{ items: CapacitySnapshotListItem[]; total: number }> {
    const where: {
      boxVersionId?: string;
      status?: CapacityStatus;
      cycleDate?: { gte?: Date; lte?: Date };
    } = {};
    if (filters?.boxVersionId) where.boxVersionId = filters.boxVersionId;
    if (filters?.status) where.status = filters.status;
    if (filters?.cycleDateFrom !== undefined || filters?.cycleDateTo !== undefined) {
      where.cycleDate = {};
      if (filters.cycleDateFrom !== undefined) where.cycleDate.gte = filters.cycleDateFrom;
      if (filters.cycleDateTo !== undefined) where.cycleDate.lte = filters.cycleDateTo;
    }
    const hasWhere = Object.keys(where).length > 0;

    const [items, total] = await Promise.all([
      prisma.capacitySnapshot.findMany({
        skip,
        take,
        ...(hasWhere && { where }),
        orderBy: { cycleDate: 'asc' },
        include: {
          boxVersion: { select: { versionName: true } },
        },
      }),
      hasWhere ? prisma.capacitySnapshot.count({ where }) : prisma.capacitySnapshot.count(),
    ]);

    return { items: items.map(mapListRow), total };
  }
}

