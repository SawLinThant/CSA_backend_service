import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';
import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';
import type { UserRepository } from '../../../../domain/users/UserRepository';
import type { ListHarvestsQuery } from '../../dtos/harvestDtos';
export declare class AdminListHarvestsUseCase {
    private readonly harvestRepository;
    private readonly farmerRepository;
    private readonly productRepository;
    private readonly userRepository;
    constructor(harvestRepository: HarvestRepository, farmerRepository: FarmerRepository, productRepository: ProductRepository, userRepository: UserRepository);
    execute(query: ListHarvestsQuery): Promise<{
        items: {
            farmerName: string | null;
            productName: string | null;
            id: string;
            farmerId: string;
            productId: string;
            quantityAvailable: number;
            unitPrice: number;
            harvestDate: Date;
            availableUntil: Date;
            status: import("../../../../domain/harvests/Harvest").HarvestStatus;
            approvedBy: string | null;
            approvedAt: Date | null;
            createdAt: Date;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=AdminListHarvestsUseCase.d.ts.map