"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUseCase = void 0;
const jwt_1 = require("../../../../core/security/jwt");
const refreshTokenSession_1 = require("../../../../core/security/refreshTokenSession");
class RefreshTokenUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
        const payload = (0, jwt_1.verifyRefreshToken)(input.refreshToken);
        if (payload.type !== 'refresh') {
            throw new Error('Invalid token type');
        }
        if (!payload.tokenId || !payload.familyId) {
            throw new Error('Invalid refresh token');
        }
        const consumed = (0, refreshTokenSession_1.consumeRefreshToken)(payload.tokenId);
        if (!consumed) {
            (0, refreshTokenSession_1.revokeRefreshTokenFamily)(payload.familyId);
            throw new Error('Refresh token has been reused or revoked');
        }
        const user = await this.userRepository.findById(payload.sub);
        if (!user || user.status !== 'active') {
            (0, refreshTokenSession_1.revokeRefreshTokenFamily)(payload.familyId);
            throw new Error('Account is not active');
        }
        const accessToken = (0, jwt_1.signAccessToken)({ sub: payload.sub, role: payload.role });
        const { refreshToken } = (0, jwt_1.issueRefreshToken)({
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
exports.RefreshTokenUseCase = RefreshTokenUseCase;
//# sourceMappingURL=RefreshTokenUseCase.js.map