import type { FarmerRepository } from '../../../../../domain/farmers/FarmerRepository';
import type { ListFarmersQuery } from '../../../dtos/userDtos';

function toPublicUser(user: { id: string; name: string; email: string | null; phone: string; role: string }) {
  return { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role };
}

export class AdminListFarmersUseCase {
  constructor(private readonly farmerRepository: FarmerRepository) {}

  async execute(query: ListFarmersQuery) {
    const skip = (query.page - 1) * query.limit;
    const filters =
      query.name ?? query.phone
        ? {
            ...(query.name && { name: query.name }),
            ...(query.phone && { phone: query.phone }),
          }
        : undefined;
    const { items, total } = await this.farmerRepository.listWithUser(skip, query.limit, filters);

    return {
      items: items.map((f) => ({
        id: f.id,
        userId: f.userId,
        farmName: f.farmName,
        farmLocation: f.farmLocation,
        farmDescription: f.farmDescription,
        approved: f.approved,
        createdAt: f.createdAt,
        user: toPublicUser(f.user),
      })),
      total,
      page: query.page,
      limit: query.limit,
    };
  }
}
