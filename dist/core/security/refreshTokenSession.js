"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackIssuedRefreshToken = trackIssuedRefreshToken;
exports.consumeRefreshToken = consumeRefreshToken;
exports.revokeRefreshTokenFamily = revokeRefreshTokenFamily;
exports.clearRefreshTokenSessionsForUser = clearRefreshTokenSessionsForUser;
exports.__getRefreshTokenSession = __getRefreshTokenSession;
const sessionsByTokenId = new Map();
function trackIssuedRefreshToken(payload) {
    sessionsByTokenId.set(payload.tokenId, {
        tokenId: payload.tokenId,
        familyId: payload.familyId,
        userId: payload.sub,
        revoked: false,
        consumedAt: null,
        issuedAt: new Date(),
    });
}
function consumeRefreshToken(tokenId) {
    const session = sessionsByTokenId.get(tokenId);
    if (!session || session.revoked || session.consumedAt) {
        return null;
    }
    session.consumedAt = new Date();
    return session;
}
function revokeRefreshTokenFamily(familyId) {
    for (const [tokenId, session] of sessionsByTokenId.entries()) {
        if (session.familyId !== familyId)
            continue;
        sessionsByTokenId.set(tokenId, {
            ...session,
            revoked: true,
        });
    }
}
function clearRefreshTokenSessionsForUser(userId) {
    for (const [tokenId, session] of sessionsByTokenId.entries()) {
        if (session.userId !== userId)
            continue;
        sessionsByTokenId.set(tokenId, {
            ...session,
            revoked: true,
        });
    }
}
function __getRefreshTokenSession(tokenId) {
    return sessionsByTokenId.get(tokenId) ?? null;
}
//# sourceMappingURL=refreshTokenSession.js.map