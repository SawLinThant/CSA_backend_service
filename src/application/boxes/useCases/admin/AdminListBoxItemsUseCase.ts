import type { BoxItemRepository } from '../../../../domain/boxes/BoxItemRepository';
import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';

export class AdminListBoxItemsUseCase {
  constructor(
    private readonly boxItemRepository: BoxItemRepository,
    private readonly boxVersionRepository: BoxVersionRepository,
  ) {}

  async execute(boxVersionId: string) {
    const version = await this.boxVersionRepository.findById(boxVersionId);
    if (!version) throw new Error('Box version not found');
    return this.boxItemRepository.listByBoxVersionId(boxVersionId);
  }
}
