import type { RefreshTokenInput } from '../../dtos/authDtos';
import type { UserRepository } from '../../../../domain/users/UserRepository';
import { issueRefreshToken, signAccessToken, verifyRefreshToken } from '../../../../core/security/jwt';
import { consumeRefreshToken, revokeRefreshTokenFamily } from '../../../../core/security/refreshTokenSession';

export class RefreshTokenUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: RefreshTokenInput) {
    const payload = verifyRefreshToken(input.refreshToken);

    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type');
    }

    if (!payload.tokenId || !payload.familyId) {
      throw new Error('Invalid refresh token');
    }

    const consumed = consumeRefreshToken(payload.tokenId);
    if (!consumed) {
      revokeRefreshTokenFamily(payload.familyId);
      throw new Error('Refresh token has been reused or revoked');
    }

    const user = await this.userRepository.findById(payload.sub);
    if (!user || user.status !== 'active') {
      revokeRefreshTokenFamily(payload.familyId);
      throw new Error('Account is not active');
    }

    const accessToken = signAccessToken({ sub: payload.sub, role: payload.role });
    const { refreshToken } = issueRefreshToken({
      sub: payload.sub,
      role: payload.role,
      familyId: payload.familyId,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
