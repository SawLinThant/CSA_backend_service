import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { ListBoxesQuery } from '../../dtos/boxDtos';

export class AdminListBoxesUseCase {
  constructor(private readonly boxRepository: BoxRepository) {}

  async execute(query: ListBoxesQuery) {
    const skip = (query.page - 1) * query.limit;
    const filters =
      query.name !== undefined || query.isActive !== undefined
        ? {
            ...(query.name && { name: query.name }),
            ...(query.isActive !== undefined && { isActive: query.isActive }),
          }
        : undefined;
    const { items, total } = await this.boxRepository.list(skip, query.limit, filters);
    return { items, total, page: query.page, limit: query.limit };
  }
}
