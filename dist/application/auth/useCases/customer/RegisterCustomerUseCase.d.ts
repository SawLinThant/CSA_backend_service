import type { UserRepository } from '../../../../domain/users/UserRepository';
import type { RegisterCustomerInput } from '../../dtos/authDtos';
export declare class RegisterCustomerUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(input: RegisterCustomerInput): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string | null;
            role: import("../../../../generated/prisma/enums").UserRole;
        };
    }>;
}
//# sourceMappingURL=RegisterCustomerUseCase.d.ts.map