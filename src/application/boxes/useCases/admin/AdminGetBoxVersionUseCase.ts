import type { BoxVersion } from '../../../../domain/boxes/BoxVersion';
import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';

export class AdminGetBoxVersionUseCase {
  constructor(private readonly boxVersionRepository: BoxVersionRepository) {}

  async execute(id: string): Promise<BoxVersion> {
    const version = await this.boxVersionRepository.findById(id);
    if (!version) throw new Error('Box version not found');
    return version;
  }
}
