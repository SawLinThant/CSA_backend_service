import type { InventoryReservationRepository } from '../../../../domain/reservations/InventoryReservationRepository';
import type { ListInventoryReservationsQuery } from '../../dtos/capacityDtos';
export declare class AdminListInventoryReservationsUseCase {
    private readonly reservationRepository;
    constructor(reservationRepository: InventoryReservationRepository);
    execute(query: ListInventoryReservationsQuery): Promise<{
        items: import("../../../../domain/reservations/InventoryReservation").InventoryReservation[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=AdminListInventoryReservationsUseCase.d.ts.map