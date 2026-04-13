import type { UserRole } from '../../domain/users/User';
export interface JwtPayload {
    sub: string;
    role: UserRole;
}
export declare function signAccessToken(payload: JwtPayload): string;
export declare function verifyAccessToken(token: string): JwtPayload;
export interface RefreshTokenPayload {
    sub: string;
    role: UserRole;
    type: 'refresh';
    tokenId: string;
    familyId: string;
}
export declare function signRefreshToken(payload: RefreshTokenPayload): string;
export declare function issueRefreshToken(payload: {
    sub: string;
    role: UserRole;
    familyId?: string;
}): {
    refreshToken: string;
    payload: RefreshTokenPayload;
};
export declare function verifyRefreshToken(token: string): RefreshTokenPayload;
//# sourceMappingURL=jwt.d.ts.map