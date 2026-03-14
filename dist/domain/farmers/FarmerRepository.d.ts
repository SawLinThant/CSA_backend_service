import type { Farmer } from './Farmer';
export type FarmerUpdateData = Partial<Pick<Farmer, 'farmName' | 'farmLocation' | 'farmDescription'>>;
export interface FarmerRepository {
    findById(id: string): Promise<Farmer | null>;
    findByUserId(userId: string): Promise<Farmer | null>;
    update(id: string, data: FarmerUpdateData): Promise<Farmer>;
}
//# sourceMappingURL=FarmerRepository.d.ts.map