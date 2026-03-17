import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';
import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { CreateBoxVersionInput } from '../../dtos/boxVersionDtos';

export class AdminCreateBoxVersionUseCase {
  constructor(
    private readonly boxVersionRepository: BoxVersionRepository,
    private readonly boxRepository: BoxRepository,
  ) {}

  async execute(input: CreateBoxVersionInput) {
    const box = await this.boxRepository.findById(input.boxId);
    if (!box) throw new Error('Box not found');
    return this.boxVersionRepository.create({
      boxId: input.boxId,
      versionName: input.versionName,
      startDate: input.startDate,
      endDate: input.endDate ?? null,
    });
  }
}
