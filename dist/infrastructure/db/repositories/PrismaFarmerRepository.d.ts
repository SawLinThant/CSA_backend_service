import type { Farmer } from '../../../domain/farmers/Farmer';
import type { FarmerRepository, FarmerUpdateData } from '../../../domain/farmers/FarmerRepository';
export declare class PrismaFarmerRepository implements FarmerRepository {
    findById(id: string): Promise<Farmer | null>;
    findByUserId(userId: string): Promise<Farmer | null>;
    update(id: string, data: FarmerUpdateData): Promise<Farmer>;
}
//# sourceMappingURL=PrismaFarmerRepository.d.ts.map