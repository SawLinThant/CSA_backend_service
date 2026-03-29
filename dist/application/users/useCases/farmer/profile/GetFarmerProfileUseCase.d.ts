import type { UserRepository } from '../../../../../domain/users/UserRepository';
import type { FarmerRepository } from '../../../../../domain/farmers/FarmerRepository';
export declare class GetFarmerProfileUseCase {
    private readonly userRepository;
    private readonly farmerRepository;
    constructor(userRepository: UserRepository, farmerRepository: FarmerRepository);
    execute(userId: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string | null;
            phone: string;
            imageUrl: string | null;
            role: "farmer";
        };
        farmer: {
            id: string;
            farmName: string;
            farmLocation: string;
            farmDescription: string | null;
            approved: boolean;
        };
    }>;
}
//# sourceMappingURL=GetFarmerProfileUseCase.d.ts.map