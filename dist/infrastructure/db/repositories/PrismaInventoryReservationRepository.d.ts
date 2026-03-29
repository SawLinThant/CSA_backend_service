import type { InventoryReservation } from '../../../domain/reservations/InventoryReservation';
import type { InventoryReservationRepository, InventoryReservationCreateData, InventoryReservationUpdateData, InventoryReservationListFilters } from '../../../domain/reservations/InventoryReservationRepository';
export declare class PrismaInventoryReservationRepository implements InventoryReservationRepository {
    findById(id: string): Promise<InventoryReservation | null>;
    findBySubscriptionAndCycleDate(subscriptionId: string, cycleDate: Date): Promise<InventoryReservation | null>;
    findByIdempotencyKey(idempotencyKey: string): Promise<InventoryReservation | null>;
    create(data: InventoryReservationCreateData): Promise<InventoryReservation>;
    update(id: string, data: InventoryReservationUpdateData): Promise<InventoryReservation>;
    list(skip: number, take: number, filters?: InventoryReservationListFilters): Promise<{
        items: InventoryReservation[];
        total: number;
    }>;
}
//# sourceMappingURL=PrismaInventoryReservationRepository.d.ts.map