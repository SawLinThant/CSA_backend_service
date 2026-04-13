import type { RefreshTokenPayload } from './jwt';

type RefreshTokenSession = {
  tokenId: string;
  familyId: string;
  userId: string;
  revoked: boolean;
  consumedAt: Date | null;
  issuedAt: Date;
};

const sessionsByTokenId = new Map<string, RefreshTokenSession>();

export function trackIssuedRefreshToken(payload: Pick<RefreshTokenPayload, 'tokenId' | 'familyId' | 'sub'>) {
  sessionsByTokenId.set(payload.tokenId, {
    tokenId: payload.tokenId,
    familyId: payload.familyId,
    userId: payload.sub,
    revoked: false,
    consumedAt: null,
    issuedAt: new Date(),
  });
}

export function consumeRefreshToken(tokenId: string): RefreshTokenSession | null {
  const session = sessionsByTokenId.get(tokenId);
  if (!session || session.revoked || session.consumedAt) {
    return null;
  }
  session.consumedAt = new Date();
  return session;
}

export function revokeRefreshTokenFamily(familyId: string) {
  for (const [tokenId, session] of sessionsByTokenId.entries()) {
    if (session.familyId !== familyId) continue;
    sessionsByTokenId.set(tokenId, {
      ...session,
      revoked: true,
    });
  }
}

export function clearRefreshTokenSessionsForUser(userId: string) {
  for (const [tokenId, session] of sessionsByTokenId.entries()) {
    if (session.userId !== userId) continue;
    sessionsByTokenId.set(tokenId, {
      ...session,
      revoked: true,
    });
  }
}

export function __getRefreshTokenSession(tokenId: string) {
  return sessionsByTokenId.get(tokenId) ?? null;
}
