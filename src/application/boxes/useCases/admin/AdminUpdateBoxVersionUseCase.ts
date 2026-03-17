import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';
import type { UpdateBoxVersionInput } from '../../dtos/boxVersionDtos';

export class AdminUpdateBoxVersionUseCase {
  constructor(private readonly boxVersionRepository: BoxVersionRepository) {}

  async execute(id: string, input: UpdateBoxVersionInput) {
    const version = await this.boxVersionRepository.findById(id);
    if (!version) throw new Error('Box version not found');
    return this.boxVersionRepository.update(id, {
      ...(input.versionName !== undefined && { versionName: input.versionName }),
      ...(input.startDate !== undefined && { startDate: input.startDate }),
      ...(input.endDate !== undefined && { endDate: input.endDate }),
    });
  }
}
