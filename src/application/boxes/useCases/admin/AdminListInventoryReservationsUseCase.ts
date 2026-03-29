import type { InventoryReservationRepository } from '../../../../domain/reservations/InventoryReservationRepository';
import type { ListInventoryReservationsQuery } from '../../dtos/capacityDtos';

export class AdminListInventoryReservationsUseCase {
  constructor(private readonly reservationRepository: InventoryReservationRepository) {}

  async execute(query: ListInventoryReservationsQuery) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;
    const filters: {
      status?: 'reserved' | 'consumed' | 'released' | 'expired';
      cycleDateFrom?: Date;
      cycleDateTo?: Date;
    } = {};
    if (query.status !== undefined) filters.status = query.status;
    if (query.cycleDateFrom !== undefined) filters.cycleDateFrom = query.cycleDateFrom;
    if (query.cycleDateTo !== undefined) filters.cycleDateTo = query.cycleDateTo;

    const { items, total } = await this.reservationRepository.list(skip, limit, filters);
    return { items, total, page, limit };
  }
}

