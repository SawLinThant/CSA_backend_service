import jwt, { type Secret } from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { env } from '../../config/env';
import type { UserRole } from '../../domain/users/User';
import { trackIssuedRefreshToken } from './refreshTokenSession';

export interface JwtPayload {
  sub: string;
  role: UserRole;
}

export function signAccessToken(payload: JwtPayload): string {
  const secret: Secret = env.JWT_SECRET;
  return (jwt as unknown as { sign: (p: JwtPayload, s: Secret, o?: unknown) => string }).sign(payload, secret, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

export function verifyAccessToken(token: string): JwtPayload {
  return (jwt as unknown as { verify: (t: string, s: Secret) => unknown }).verify(token, env.JWT_SECRET) as JwtPayload;
}

export interface RefreshTokenPayload {
  sub: string;
  role: UserRole;
  type: 'refresh';
  tokenId: string;
  familyId: string;
}

export function signRefreshToken(payload: RefreshTokenPayload): string {
  const secret: Secret = env.REFRESH_TOKEN_SECRET;
  return (jwt as unknown as { sign: (p: RefreshTokenPayload, s: Secret, o?: unknown) => string }).sign(
    payload,
    secret,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    },
  );
}

export function issueRefreshToken(payload: { sub: string; role: UserRole; familyId?: string }) {
  const tokenId = randomUUID();
  const familyId = payload.familyId ?? tokenId;
  const refreshPayload: RefreshTokenPayload = {
    sub: payload.sub,
    role: payload.role,
    type: 'refresh',
    tokenId,
    familyId,
  };
  const refreshToken = signRefreshToken(refreshPayload);
  trackIssuedRefreshToken(refreshPayload);
  return {
    refreshToken,
    payload: refreshPayload,
  };
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return (jwt as unknown as { verify: (t: string, s: Secret) => unknown }).verify(
    token,
    env.REFRESH_TOKEN_SECRET,
  ) as RefreshTokenPayload;
}

