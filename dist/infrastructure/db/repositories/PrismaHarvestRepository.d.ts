import type { Harvest } from '../../../domain/harvests/Harvest';
import type { HarvestRepository, HarvestCreateData, HarvestUpdateData, HarvestListByFarmerFilters, HarvestListFilters } from '../../../domain/harvests/HarvestRepository';
export declare class PrismaHarvestRepository implements HarvestRepository {
    create(data: HarvestCreateData): Promise<Harvest>;
    findById(id: string): Promise<Harvest | null>;
    findByIdAndFarmerId(id: string, farmerId: string): Promise<Harvest | null>;
    listByFarmerId(farmerId: string, skip: number, take: number, filters?: HarvestListByFarmerFilters): Promise<{
        items: Harvest[];
        total: number;
    }>;
    list(skip: number, take: number, filters?: HarvestListFilters): Promise<{
        items: Harvest[];
        total: number;
    }>;
    update(id: string, data: HarvestUpdateData): Promise<Harvest>;
    setApproval(id: string, status: 'approved' | 'rejected', approvedBy: string): Promise<Harvest>;
}
//# sourceMappingURL=PrismaHarvestRepository.d.ts.map