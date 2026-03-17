import type { Harvest } from '../../../domain/harvests/Harvest';
import type {
  HarvestRepository,
  HarvestCreateData,
  HarvestUpdateData,
  HarvestListByFarmerFilters,
  HarvestListFilters,
} from '../../../domain/harvests/HarvestRepository';
import prisma from '../prismaClient';

function mapRowToHarvest(row: {
  id: string;
  farmerId: string;
  productId: string;
  quantityAvailable: number;
  unitPrice: unknown;
  harvestDate: Date;
  availableUntil: Date;
  status: string;
  approvedBy: string | null;
  approvedAt: Date | null;
  createdAt: Date;
}): Harvest {
  return {
    id: row.id,
    farmerId: row.farmerId,
    productId: row.productId,
    quantityAvailable: row.quantityAvailable,
    unitPrice: Number(row.unitPrice),
    harvestDate: row.harvestDate,
    availableUntil: row.availableUntil,
    status: row.status as Harvest['status'],
    approvedBy: row.approvedBy,
    approvedAt: row.approvedAt,
    createdAt: row.createdAt,
  };
}

export class PrismaHarvestRepository implements HarvestRepository {
  async create(data: HarvestCreateData): Promise<Harvest> {
    const row = await prisma.harvest.create({
      data: {
        farmerId: data.farmerId,
        productId: data.productId,
        quantityAvailable: data.quantityAvailable,
        unitPrice: data.unitPrice,
        harvestDate: data.harvestDate,
        availableUntil: data.availableUntil,
      },
    });
    return mapRowToHarvest(row);
  }

  async findById(id: string): Promise<Harvest | null> {
    const row = await prisma.harvest.findUnique({ where: { id } });
    if (!row) return null;
    return mapRowToHarvest(row);
  }

  async findByIdAndFarmerId(id: string, farmerId: string): Promise<Harvest | null> {
    const row = await prisma.harvest.findFirst({
      where: { id, farmerId },
    });
    if (!row) return null;
    return mapRowToHarvest(row);
  }

  async listByFarmerId(
    farmerId: string,
    skip: number,
    take: number,
    filters?: HarvestListByFarmerFilters,
  ): Promise<{ items: Harvest[]; total: number }> {
    const where: {
      farmerId: string;
      productId?: string;
      status?: Harvest['status'];
      harvestDate?: { gte?: Date; lte?: Date };
    } = { farmerId };
    if (filters?.productId) where.productId = filters.productId;
    if (filters?.status) where.status = filters.status;
    if (filters?.harvestDateFrom !== undefined || filters?.harvestDateTo !== undefined) {
      where.harvestDate = {};
      if (filters.harvestDateFrom !== undefined) where.harvestDate.gte = filters.harvestDateFrom;
      if (filters.harvestDateTo !== undefined) where.harvestDate.lte = filters.harvestDateTo;
    }

    const [items, total] = await Promise.all([
      prisma.harvest.findMany({
        skip,
        take,
        where,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.harvest.count({ where }),
    ]);
    return {
      items: items.map(mapRowToHarvest),
      total,
    };
  }

  async list(
    skip: number,
    take: number,
    filters?: HarvestListFilters,
  ): Promise<{ items: Harvest[]; total: number }> {
    const where: {
      farmerId?: string;
      productId?: string;
      status?: Harvest['status'];
      harvestDate?: { gte?: Date; lte?: Date };
    } = {};
    if (filters?.farmerId) where.farmerId = filters.farmerId;
    if (filters?.productId) where.productId = filters.productId;
    if (filters?.status) where.status = filters.status;
    if (filters?.harvestDateFrom !== undefined || filters?.harvestDateTo !== undefined) {
      where.harvestDate = {};
      if (filters.harvestDateFrom !== undefined) where.harvestDate.gte = filters.harvestDateFrom;
      if (filters.harvestDateTo !== undefined) where.harvestDate.lte = filters.harvestDateTo;
    }
    const hasWhere = Object.keys(where).length > 0;

    const [items, total] = await Promise.all([
      prisma.harvest.findMany({
        skip,
        take,
        ...(hasWhere && { where }),
        orderBy: { createdAt: 'desc' },
      }),
      hasWhere ? prisma.harvest.count({ where }) : prisma.harvest.count(),
    ]);
    return {
      items: items.map(mapRowToHarvest),
      total,
    };
  }

  async update(id: string, data: HarvestUpdateData): Promise<Harvest> {
    const row = await prisma.harvest.update({
      where: { id },
      data: {
        ...(data.quantityAvailable !== undefined && { quantityAvailable: data.quantityAvailable }),
        ...(data.unitPrice !== undefined && { unitPrice: data.unitPrice }),
        ...(data.harvestDate !== undefined && { harvestDate: data.harvestDate }),
        ...(data.availableUntil !== undefined && { availableUntil: data.availableUntil }),
      },
    });
    return mapRowToHarvest(row);
  }

  async setApproval(id: string, status: 'approved' | 'rejected', approvedBy: string): Promise<Harvest> {
    const row = await prisma.harvest.update({
      where: { id },
      data: { status, approvedBy, approvedAt: new Date() },
    });
    return mapRowToHarvest(row);
  }
}
