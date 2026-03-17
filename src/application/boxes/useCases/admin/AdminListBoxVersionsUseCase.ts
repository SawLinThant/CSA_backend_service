import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';
import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { ListBoxVersionsQuery } from '../../dtos/boxVersionDtos';

export class AdminListBoxVersionsUseCase {
  constructor(
    private readonly boxVersionRepository: BoxVersionRepository,
    private readonly boxRepository: BoxRepository,
  ) {}

  async execute(query: ListBoxVersionsQuery) {
    if (query.boxId) {
      const box = await this.boxRepository.findById(query.boxId);
      if (!box) throw new Error('Box not found');
    }
    const skip = (query.page - 1) * query.limit;
    const filters = query.boxId ? { boxId: query.boxId } : undefined;
    const { items, total } = await this.boxVersionRepository.list(skip, query.limit, filters);
    return { items, total, page: query.page, limit: query.limit };
  }
}
