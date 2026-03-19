import type { FarmerRepository } from '../../../../../domain/farmers/FarmerRepository';
import type { ListFarmersQuery } from '../../../dtos/userDtos';
export declare class AdminListFarmersUseCase {
    private readonly farmerRepository;
    constructor(farmerRepository: FarmerRepository);
    execute(query: ListFarmersQuery): Promise<{
        items: {
            id: string;
            userId: string;
            farmName: string;
            farmLocation: string;
            farmDescription: string | null;
            approved: boolean;
            createdAt: Date;
            user: {
                id: string;
                name: string;
                email: string | null;
                phone: string;
                role: string;
                status: "active" | "suspended";
            };
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=AdminListFarmersUseCase.d.ts.map