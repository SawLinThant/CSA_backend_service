import type { CapacitySnapshotRepository } from '../../../../domain/capacity/CapacitySnapshotRepository';
import type { ListCapacitySnapshotsQuery } from '../../dtos/capacityDtos';

export class AdminListCapacitySnapshotsUseCase {
  constructor(private readonly capacitySnapshotRepository: CapacitySnapshotRepository) {}

  async execute(query: ListCapacitySnapshotsQuery) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;
    const filters: {
      boxVersionId?: string;
      status?: 'open' | 'locked' | 'closed';
      cycleDateFrom?: Date;
      cycleDateTo?: Date;
    } = {};
    if (query.boxVersionId !== undefined) filters.boxVersionId = query.boxVersionId;
    if (query.status !== undefined) filters.status = query.status;
    if (query.cycleDateFrom !== undefined) filters.cycleDateFrom = query.cycleDateFrom;
    if (query.cycleDateTo !== undefined) filters.cycleDateTo = query.cycleDateTo;

    const { items, total } = await this.capacitySnapshotRepository.list(skip, limit, filters);
    return { items, total, page, limit };
  }
}

