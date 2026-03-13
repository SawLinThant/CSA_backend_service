import jwt, { type Secret } from 'jsonwebtoken';
import { env } from '../../config/env';
import type { UserRole } from '../../domain/users/User';

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

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return (jwt as unknown as { verify: (t: string, s: Secret) => unknown }).verify(
    token,
    env.REFRESH_TOKEN_SECRET,
  ) as RefreshTokenPayload;
}

