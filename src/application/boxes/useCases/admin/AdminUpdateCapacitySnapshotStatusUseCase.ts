import type { CapacitySnapshotRepository } from '../../../../domain/capacity/CapacitySnapshotRepository';
import type { UpdateCapacitySnapshotStatusInput } from '../../dtos/capacityDtos';

export class AdminUpdateCapacitySnapshotStatusUseCase {
  constructor(private readonly capacitySnapshotRepository: CapacitySnapshotRepository) {}

  async execute(id: string, input: UpdateCapacitySnapshotStatusInput) {
    const snapshot = await this.capacitySnapshotRepository.findById(id);
    if (!snapshot) throw new Error('Capacity snapshot not found');
    return this.capacitySnapshotRepository.update(id, { status: input.status });
  }
}

