import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';
import type { BoxItemRepository } from '../../../../domain/boxes/BoxItemRepository';
import type { CapacitySnapshotRepository } from '../../../../domain/capacity/CapacitySnapshotRepository';
import type { RecomputeBoxVersionCapacityInput } from '../../dtos/capacityDtos';
import prisma from '../../../../infrastructure/db/prismaClient';

function startOfDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function endOfDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999));
}

export class RecomputeBoxVersionCapacityUseCase {
  constructor(
    private readonly boxVersionRepository: BoxVersionRepository,
    private readonly boxItemRepository: BoxItemRepository,
    private readonly capacitySnapshotRepository: CapacitySnapshotRepository,
  ) {}

  async execute(boxVersionId: string, input: RecomputeBoxVersionCapacityInput) {
    const boxVersion = await this.boxVersionRepository.findById(boxVersionId);
    if (!boxVersion) throw new Error('Box version not found');

    const cycleDate = startOfDay(input.cycleDate);
    if (boxVersion.startDate > cycleDate) {
      throw new Error('Box version is not active for the selected cycle');
    }
    if (boxVersion.endDate && boxVersion.endDate < cycleDate) {
      throw new Error('Box version has already ended for the selected cycle');
    }

    const items = await this.boxItemRepository.listByBoxVersionId(boxVersionId);
    const requiredItems = items.filter((item) => !item.optional && item.quantity > 0);
    if (requiredItems.length === 0) {
      const snapshot = await this.capacitySnapshotRepository.upsertForCycle({
        boxVersionId,
        cycleDate,
        maxBoxes: 0,
      });
      return { snapshot, debug: { reason: 'no_required_items', itemCaps: [] as Array<{ boxItemId: string; cap: number }> } };
    }

    const cycleStart = startOfDay(cycleDate);
    const cycleEnd = endOfDay(cycleDate);
    const itemCaps: Array<{ boxItemId: string; cap: number }> = [];

    for (const item of requiredItems) {
      const agg = await prisma.harvest.aggregate({
        where: {
          farmerId: item.farmerId,
          productId: item.productId,
          status: 'approved',
          harvestDate: { lte: cycleEnd },
          availableUntil: { gte: cycleStart },
        },
        _sum: { quantityAvailable: true },
      });
      const totalAvailable = agg._sum.quantityAvailable ?? 0;
      itemCaps.push({
        boxItemId: item.id,
        cap: Math.floor(totalAvailable / item.quantity),
      });
    }

    const maxBoxes = itemCaps.length ? Math.max(0, Math.min(...itemCaps.map((v) => v.cap))) : 0;

    const snapshot = await this.capacitySnapshotRepository.upsertForCycle({
      boxVersionId,
      cycleDate,
      maxBoxes,
    });

    return { snapshot, debug: { reason: 'computed', itemCaps } };
  }
}

