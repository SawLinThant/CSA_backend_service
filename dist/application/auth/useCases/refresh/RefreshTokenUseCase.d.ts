import type { RefreshTokenInput } from '../../dtos/authDtos';
export declare class RefreshTokenUseCase {
    execute(input: RefreshTokenInput): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
//# sourceMappingURL=RefreshTokenUseCase.d.ts.map