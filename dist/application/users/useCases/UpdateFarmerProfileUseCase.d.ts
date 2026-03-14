import type { UserRepository } from '../../../domain/users/UserRepository';
import type { FarmerRepository } from '../../../domain/farmers/FarmerRepository';
import type { UpdateFarmerProfileInput } from '../dtos/userDtos';
export declare class UpdateFarmerProfileUseCase {
    private readonly userRepository;
    private readonly farmerRepository;
    constructor(userRepository: UserRepository, farmerRepository: FarmerRepository);
    execute(userId: string, input: UpdateFarmerProfileInput): Promise<{
        user: {
            id: string;
            name: string;
            email: string | null;
            phone: string;
            role: import("../../../domain/users/User").UserRole;
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
//# sourceMappingURL=UpdateFarmerProfileUseCase.d.ts.map