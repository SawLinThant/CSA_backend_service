import type { InventoryReservation, ReservationStatus } from './InventoryReservation';

export interface InventoryReservationCreateData {
  subscriptionId: string;
  boxVersionId: string;
  capacitySnapshotId: string;
  cycleDate: Date;
  quantity?: number;
  status?: ReservationStatus;
  reason?: string | null;
  idempotencyKey: string;
}

export interface InventoryReservationUpdateData {
  status?: ReservationStatus;
  reason?: string | null;
}

export interface InventoryReservationListFilters {
  status?: ReservationStatus;
  cycleDateFrom?: Date;
  cycleDateTo?: Date;
}

export interface InventoryReservationRepository {
  findById(id: string): Promise<InventoryReservation | null>;
  findBySubscriptionAndCycleDate(subscriptionId: string, cycleDate: Date): Promise<InventoryReservation | null>;
  findByIdempotencyKey(idempotencyKey: string): Promise<InventoryReservation | null>;
  create(data: InventoryReservationCreateData): Promise<InventoryReservation>;
  update(id: string, data: InventoryReservationUpdateData): Promise<InventoryReservation>;
  list(skip: number, take: number, filters?: InventoryReservationListFilters): Promise<{ items: InventoryReservation[]; total: number }>;
}

