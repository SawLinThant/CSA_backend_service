"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const RefreshTokenUseCase_1 = require("./RefreshTokenUseCase");
const jwt_1 = require("../../../../core/security/jwt");
const refreshTokenSession_1 = require("../../../../core/security/refreshTokenSession");
function createUserRepository(status) {
    return {
        findById: async (id) => ({
            id,
            name: 'Test User',
            email: 'test@example.com',
            phone: '099999999',
            imageUrl: null,
            passwordHash: 'hash',
            role: 'customer',
            status,
            createdAt: new Date(),
        }),
        findByEmail: async () => null,
        findByPhone: async () => null,
        create: async () => {
            throw new Error('not implemented');
        },
        update: async () => {
            throw new Error('not implemented');
        },
        delete: async () => undefined,
    };
}
(0, node_test_1.default)('refresh rotates refresh token and keeps family', async () => {
    const useCase = new RefreshTokenUseCase_1.RefreshTokenUseCase(createUserRepository('active'));
    const { refreshToken } = (0, jwt_1.issueRefreshToken)({ sub: 'u1', role: 'customer' });
    const result = await useCase.execute({ refreshToken });
    const nextPayload = (0, jwt_1.verifyRefreshToken)(result.refreshToken);
    strict_1.default.equal(typeof result.accessToken, 'string');
    strict_1.default.equal(nextPayload.familyId.length > 0, true);
    strict_1.default.equal(nextPayload.tokenId.length > 0, true);
    strict_1.default.notEqual(nextPayload.tokenId, (0, jwt_1.verifyRefreshToken)(refreshToken).tokenId);
});
(0, node_test_1.default)('refresh token reuse is rejected and family gets revoked', async () => {
    const useCase = new RefreshTokenUseCase_1.RefreshTokenUseCase(createUserRepository('active'));
    const { refreshToken } = (0, jwt_1.issueRefreshToken)({ sub: 'u2', role: 'customer' });
    await useCase.execute({ refreshToken });
    await strict_1.default.rejects(async () => useCase.execute({ refreshToken }), /reused|revoked/i);
    const originalPayload = (0, jwt_1.verifyRefreshToken)(refreshToken);
    const originalSession = (0, refreshTokenSession_1.__getRefreshTokenSession)(originalPayload.tokenId);
    strict_1.default.equal(originalSession?.revoked, true);
});
(0, node_test_1.default)('refresh fails when user is not active', async () => {
    const useCase = new RefreshTokenUseCase_1.RefreshTokenUseCase(createUserRepository('suspended'));
    const { refreshToken } = (0, jwt_1.issueRefreshToken)({ sub: 'u3', role: 'customer' });
    await strict_1.default.rejects(async () => useCase.execute({ refreshToken }), /Account is not active/i);
});
//# sourceMappingURL=RefreshTokenUseCase.test.js.map