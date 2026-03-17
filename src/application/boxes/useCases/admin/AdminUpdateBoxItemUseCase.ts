import type { BoxItemRepository } from '../../../../domain/boxes/BoxItemRepository';
import type { UpdateBoxItemInput } from '../../dtos/boxItemDtos';

export class AdminUpdateBoxItemUseCase {
  constructor(private readonly boxItemRepository: BoxItemRepository) {}

  async execute(id: string, input: UpdateBoxItemInput) {
    const item = await this.boxItemRepository.findById(id);
    if (!item) throw new Error('Box item not found');
    return this.boxItemRepository.update(id, {
      ...(input.quantity !== undefined && { quantity: input.quantity }),
      ...(input.optional !== undefined && { optional: input.optional }),
    });
  }
}
