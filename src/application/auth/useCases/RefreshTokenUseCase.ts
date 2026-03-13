import type { RefreshTokenInput } from '../dtos/authDtos';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../../core/security/jwt';

export class RefreshTokenUseCase {
  async execute(input: RefreshTokenInput) {
    const payload = verifyRefreshToken(input.refreshToken);

    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type');
    }

    const accessToken = signAccessToken({ sub: payload.sub, role: payload.role });
    const refreshToken = signRefreshToken({ sub: payload.sub, role: payload.role, type: 'refresh' });

    return {
      accessToken,
      refreshToken,
    };
  }
}

