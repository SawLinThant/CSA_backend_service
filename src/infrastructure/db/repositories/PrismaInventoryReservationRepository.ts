import type { InventoryReservation, ReservationStatus } from '../../../domain/reservations/InventoryReservation';
import type {
  InventoryReservationRepository,
  InventoryReservationCreateData,
  InventoryReservationUpdateData,
  InventoryReservationListFilters,
} from '../../../domain/reservations/InventoryReservationRepository';
import prisma from '../prismaClient';

function mapRow(row: {
  id: string;
  subscriptionId: string;
  boxVersionId: string;
  capacitySnapshotId: string;
  cycleDate: Date;
  quantity: number;
  status: string;
  reason: string | null;
  idempotencyKey: string;
  createdAt: Date;
  updatedAt: Date;
}): InventoryReservation {
  return {
    id: row.id,
    subscriptionId: row.subscriptionId,
    boxVersionId: row.boxVersionId,
    capacitySnapshotId: row.capacitySnapshotId,
    cycleDate: row.cycleDate,
    quantity: row.quantity,
    status: row.status as ReservationStatus,
    reason: row.reason,
    idempotencyKey: row.idempotencyKey,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export class PrismaInventoryReservationRepository implements InventoryReservationRepository {
  async findById(id: string): Promise<InventoryReservation | null> {
    const row = await prisma.inventoryReservation.findUnique({ where: { id } });
    return row ? mapRow(row) : null;
  }

  async findBySubscriptionAndCycleDate(subscriptionId: string, cycleDate: Date): Promise<InventoryReservation | null> {
    const row = await prisma.inventoryReservation.findUnique({
      where: { subscriptionId_cycleDate: { subscriptionId, cycleDate } },
    });
    return row ? mapRow(row) : null;
  }

  async findByIdempotencyKey(idempotencyKey: string): Promise<InventoryReservation | null> {
    const row = await prisma.inventoryReservation.findUnique({ where: { idempotencyKey } });
    return row ? mapRow(row) : null;
  }

  async create(data: InventoryReservationCreateData): Promise<InventoryReservation> {
    const row = await prisma.inventoryReservation.create({
      data: {
        subscriptionId: data.subscriptionId,
        boxVersionId: data.boxVersionId,
        capacitySnapshotId: data.capacitySnapshotId,
        cycleDate: data.cycleDate,
        quantity: data.quantity ?? 1,
        status: data.status ?? 'reserved',
        reason: data.reason ?? null,
        idempotencyKey: data.idempotencyKey,
      },
    });
    return mapRow(row);
  }

  async update(id: string, data: InventoryReservationUpdateData): Promise<InventoryReservation> {
    const row = await prisma.inventoryReservation.update({
      where: { id },
      data: {
        ...(data.status !== undefined && { status: data.status }),
        ...(data.reason !== undefined && { reason: data.reason }),
      },
    });
    return mapRow(row);
  }

  async list(
    skip: number,
    take: number,
    filters?: InventoryReservationListFilters,
  ): Promise<{ items: InventoryReservation[]; total: number }> {
    const where: {
      status?: ReservationStatus;
      cycleDate?: { gte?: Date; lte?: Date };
    } = {};
    if (filters?.status) where.status = filters.status;
    if (filters?.cycleDateFrom !== undefined || filters?.cycleDateTo !== undefined) {
      where.cycleDate = {};
      if (filters.cycleDateFrom !== undefined) where.cycleDate.gte = filters.cycleDateFrom;
      if (filters.cycleDateTo !== undefined) where.cycleDate.lte = filters.cycleDateTo;
    }
    const hasWhere = Object.keys(where).length > 0;

    const [items, total] = await Promise.all([
      prisma.inventoryReservation.findMany({
        skip,
        take,
        ...(hasWhere && { where }),
        orderBy: [{ cycleDate: 'asc' }, { createdAt: 'asc' }],
      }),
      hasWhere ? prisma.inventoryReservation.count({ where }) : prisma.inventoryReservation.count(),
    ]);

    return { items: items.map(mapRow), total };
  }
}

