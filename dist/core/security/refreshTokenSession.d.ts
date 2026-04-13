import type { RefreshTokenPayload } from './jwt';
type RefreshTokenSession = {
    tokenId: string;
    familyId: string;
    userId: string;
    revoked: boolean;
    consumedAt: Date | null;
    issuedAt: Date;
};
export declare function trackIssuedRefreshToken(payload: Pick<RefreshTokenPayload, 'tokenId' | 'familyId' | 'sub'>): void;
export declare function consumeRefreshToken(tokenId: string): RefreshTokenSession | null;
export declare function revokeRefreshTokenFamily(familyId: string): void;
export declare function clearRefreshTokenSessionsForUser(userId: string): void;
export declare function __getRefreshTokenSession(tokenId: string): RefreshTokenSession | null;
export {};
//# sourceMappingURL=refreshTokenSession.d.ts.map