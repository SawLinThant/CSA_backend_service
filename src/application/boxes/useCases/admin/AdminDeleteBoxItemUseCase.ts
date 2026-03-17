import type { BoxItemRepository } from '../../../../domain/boxes/BoxItemRepository';

export class AdminDeleteBoxItemUseCase {
  constructor(private readonly boxItemRepository: BoxItemRepository) {}

  async execute(id: string) {
    const item = await this.boxItemRepository.findById(id);
    if (!item) throw new Error('Box item not found');
    await this.boxItemRepository.delete(id);
  }
}
