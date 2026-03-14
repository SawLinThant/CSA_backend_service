"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUseCase = void 0;
const jwt_1 = require("../../../../core/security/jwt");
class RefreshTokenUseCase {
    async execute(input) {
        const payload = (0, jwt_1.verifyRefreshToken)(input.refreshToken);
        if (payload.type !== 'refresh') {
            throw new Error('Invalid token type');
        }
        const accessToken = (0, jwt_1.signAccessToken)({ sub: payload.sub, role: payload.role });
        const refreshToken = (0, jwt_1.signRefreshToken)({ sub: payload.sub, role: payload.role, type: 'refresh' });
        return {
            accessToken,
            refreshToken,
        };
    }
}
exports.RefreshTokenUseCase = RefreshTokenUseCase;
//# sourceMappingURL=RefreshTokenUseCase.js.map