import type { Harvest } from './Harvest';

export type HarvestCreateData = Omit<Harvest, 'id' | 'status' | 'approvedBy' | 'approvedAt' | 'createdAt'>;
export type HarvestUpdateData = Partial<
  Pick<Harvest, 'quantityAvailable' | 'unitPrice' | 'harvestDate' | 'availableUntil'>
>;

export interface HarvestListByFarmerFilters {
  productId?: string;
  status?: Harvest['status'];
  harvestDateFrom?: Date;
  harvestDateTo?: Date;
}

export interface HarvestListFilters {
  farmerId?: string;
  productId?: string;
  status?: Harvest['status'];
  harvestDateFrom?: Date;
  harvestDateTo?: Date;
}

export interface HarvestRepository {
  create(data: HarvestCreateData): Promise<Harvest>;
  findById(id: string): Promise<Harvest | null>;
  findByIdAndFarmerId(id: string, farmerId: string): Promise<Harvest | null>;
  listByFarmerId(
    farmerId: string,
    skip: number,
    take: number,
    filters?: HarvestListByFarmerFilters,
  ): Promise<{ items: Harvest[]; total: number }>;
  list(
    skip: number,
    take: number,
    filters?: HarvestListFilters,
  ): Promise<{ items: Harvest[]; total: number }>;
  update(id: string, data: HarvestUpdateData): Promise<Harvest>;
  setApproval(id: string, status: 'approved' | 'rejected', approvedBy: string): Promise<Harvest>;
}
