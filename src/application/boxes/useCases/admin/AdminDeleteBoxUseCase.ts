import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';

export class AdminDeleteBoxUseCase {
  constructor(
    private readonly boxRepository: BoxRepository,
    private readonly boxVersionRepository: BoxVersionRepository,
  ) {}

  async execute(id: string) {
    const box = await this.boxRepository.findById(id);
    if (!box) throw new Error('Box not found');
    const { items } = await this.boxVersionRepository.list(0, 1, { boxId: id });
    if (items.length > 0) throw new Error('Cannot delete box that has versions. Delete all box versions first.');
    await this.boxRepository.delete(id);
  }
}
