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
}
export declare function signRefreshToken(payload: RefreshTokenPayload): string;
export declare function verifyRefreshToken(token: string): RefreshTokenPayload;
//# sourceMappingURL=jwt.d.ts.map