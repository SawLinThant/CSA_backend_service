import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';
import type { BoxItemRepository } from '../../../../domain/boxes/BoxItemRepository';

export class AdminDeleteBoxVersionUseCase {
  constructor(
    private readonly boxVersionRepository: BoxVersionRepository,
    private readonly boxItemRepository: BoxItemRepository,
  ) {}

  async execute(id: string) {
    const version = await this.boxVersionRepository.findById(id);
    if (!version) throw new Error('Box version not found');
    const items = await this.boxItemRepository.listByBoxVersionId(id);
    if (items.length > 0) throw new Error('Cannot delete box version that has items. Delete all box items first.');
    await this.boxVersionRepository.delete(id);
  }
}
