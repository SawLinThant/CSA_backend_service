import type { RefreshTokenInput } from '../../dtos/authDtos';
import type { UserRepository } from '../../../../domain/users/UserRepository';
export declare class RefreshTokenUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(input: RefreshTokenInput): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
//# sourceMappingURL=RefreshTokenUseCase.d.ts.map