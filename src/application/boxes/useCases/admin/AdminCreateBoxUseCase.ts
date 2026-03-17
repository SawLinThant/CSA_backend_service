import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { CreateBoxInput } from '../../dtos/boxDtos';

export class AdminCreateBoxUseCase {
  constructor(private readonly boxRepository: BoxRepository) {}

  async execute(input: CreateBoxInput) {
    return this.boxRepository.create({
      name: input.name,
      description: input.description ?? null,
      imageUrl: input.imageUrl ?? null,
      isActive: input.isActive ?? true,
    });
  }
}
