import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { PublicBoxDetailQuery } from '../../dtos/boxDtos';
import prisma from '../../../../infrastructure/db/prismaClient';

function startOfDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export class PublicGetBoxDetailUseCase {
  constructor(private readonly boxRepository: BoxRepository) {}

  async execute(boxId: string, query: PublicBoxDetailQuery) {
    const box = await this.boxRepository.findById(boxId);
    if (!box || !box.isActive) throw new Error('Box not found');

    const referenceDate = startOfDay(query.date ?? new Date());

    const [activePlan, activeVersion] = await Promise.all([
      prisma.subscriptionPlan.findFirst({
        where: { boxId, active: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.boxVersion.findFirst({
        where: {
          boxId,
          startDate: { lte: referenceDate },
          OR: [{ endDate: null }, { endDate: { gte: referenceDate } }],
        },
        orderBy: { startDate: 'desc' },
      }),
    ]);

    const sampleItems =
      activeVersion == null
        ? []
        : await prisma.boxItem.findMany({
            where: { boxVersionId: activeVersion.id },
            orderBy: [{ optional: 'asc' }, { id: 'asc' }],
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  unit: true,
                  images: {
                    select: { imageUrl: true, isPrimary: true, sortOrder: true },
                    orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
                    take: 1,
                  },
                },
              },
              farmer: {
                select: {
                  id: true,
                  farmName: true,
                  user: { select: { name: true } },
                },
              },
            },
          });

    return {
      box: {
        id: box.id,
        name: box.name,
        description: box.description,
        imageUrl: box.imageUrl,
      },
      activePlan: activePlan
        ? {
            id: activePlan.id,
            name: activePlan.name,
            price: Number(activePlan.price),
            deliveryFrequency: activePlan.deliveryFrequency,
            deliveriesPerCycle: activePlan.deliveriesPerCycle,
          }
        : null,
      activeVersion: activeVersion
        ? {
            id: activeVersion.id,
            versionName: activeVersion.versionName,
            startDate: activeVersion.startDate,
            endDate: activeVersion.endDate,
          }
        : null,
      sampleItems: sampleItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        optional: item.optional,
        product: {
          id: item.product.id,
          name: item.product.name,
          unit: item.product.unit,
          imageUrl: item.product.images[0]?.imageUrl ?? null,
        },
        farmer: {
          id: item.farmer.id,
          name: item.farmer.user.name,
          farmName: item.farmer.farmName,
        },
      })),
      meta: {
        referenceDate,
        disclaimer: 'Items may vary weekly depending on harvest',
      },
    };
  }
}
