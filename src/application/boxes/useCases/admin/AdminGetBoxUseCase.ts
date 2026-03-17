import type { Box } from '../../../../domain/boxes/Box';
import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';

export class AdminGetBoxUseCase {
  constructor(private readonly boxRepository: BoxRepository) {}

  async execute(id: string): Promise<Box> {
    const box = await this.boxRepository.findById(id);
    if (!box) throw new Error('Box not found');
    return box;
  }
}
