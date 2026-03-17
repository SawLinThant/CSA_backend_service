import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { UpdateBoxInput } from '../../dtos/boxDtos';

export class AdminUpdateBoxUseCase {
  constructor(private readonly boxRepository: BoxRepository) {}

  async execute(id: string, input: UpdateBoxInput) {
    const box = await this.boxRepository.findById(id);
    if (!box) throw new Error('Box not found');
    return this.boxRepository.update(id, {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.imageUrl !== undefined && { imageUrl: input.imageUrl }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
    });
  }
}
