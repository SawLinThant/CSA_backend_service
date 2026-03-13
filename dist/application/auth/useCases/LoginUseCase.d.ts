import type { UserRepository } from '../../../domain/users/UserRepository';
import type { UserRole } from '../../../domain/users/User';
import type { LoginInput } from '../dtos/authDtos';
export declare class LoginUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(input: LoginInput, expectedRole: UserRole): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string | null;
            role: UserRole;
        };
    }>;
}
//# sourceMappingURL=LoginUseCase.d.ts.map