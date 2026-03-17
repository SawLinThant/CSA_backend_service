import type { BoxItem } from '../../../../domain/boxes/BoxItem';
import type { BoxItemRepository } from '../../../../domain/boxes/BoxItemRepository';

export class AdminGetBoxItemUseCase {
  constructor(private readonly boxItemRepository: BoxItemRepository) {}

  async execute(id: string): Promise<BoxItem> {
    const item = await this.boxItemRepository.findById(id);
    if (!item) throw new Error('Box item not found');
    return item;
  }
}
