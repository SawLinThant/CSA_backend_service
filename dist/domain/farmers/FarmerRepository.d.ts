import type { User } from '../users/User';
import type { Farmer } from './Farmer';
export type FarmerWithUser = Farmer & {
    user: User;
};
export type FarmerListFilters = {
    name?: string;
    phone?: string;
};
export type FarmerUpdateData = Partial<Pick<Farmer, 'farmName' | 'farmLocation' | 'farmDescription'>>;
export interface FarmerRepository {
    findById(id: string): Promise<Farmer | null>;
    findByUserId(userId: string): Promise<Farmer | null>;
    listWithUser(skip: number, take: number, filters?: FarmerListFilters): Promise<{
        items: FarmerWithUser[];
        total: number;
    }>;
    update(id: string, data: FarmerUpdateData): Promise<Farmer>;
}
//# sourceMappingURL=FarmerRepository.d.ts.map