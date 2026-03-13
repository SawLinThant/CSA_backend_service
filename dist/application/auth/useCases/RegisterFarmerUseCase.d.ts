import type { UserRepository } from '../../../domain/users/UserRepository';
import type { RegisterFarmerInput } from '../dtos/authDtos';
export declare class RegisterFarmerUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(input: RegisterFarmerInput): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string | null;
            role: import("../../../generated/prisma/enums").UserRole;
        };
    }>;
}
//# sourceMappingURL=RegisterFarmerUseCase.d.ts.map