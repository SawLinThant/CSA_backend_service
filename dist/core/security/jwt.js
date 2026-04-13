"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.verifyAccessToken = verifyAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.issueRefreshToken = issueRefreshToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const env_1 = require("../../config/env");
const refreshTokenSession_1 = require("./refreshTokenSession");
function signAccessToken(payload) {
    const secret = env_1.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: env_1.env.JWT_EXPIRES_IN,
    });
}
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
}
function signRefreshToken(payload) {
    const secret = env_1.env.REFRESH_TOKEN_SECRET;
    return jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: env_1.env.REFRESH_TOKEN_EXPIRES_IN,
    });
}
function issueRefreshToken(payload) {
    const tokenId = (0, crypto_1.randomUUID)();
    const familyId = payload.familyId ?? tokenId;
    const refreshPayload = {
        sub: payload.sub,
        role: payload.role,
        type: 'refresh',
        tokenId,
        familyId,
    };
    const refreshToken = signRefreshToken(refreshPayload);
    (0, refreshTokenSession_1.trackIssuedRefreshToken)(refreshPayload);
    return {
        refreshToken,
        payload: refreshPayload,
    };
}
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, env_1.env.REFRESH_TOKEN_SECRET);
}
//# sourceMappingURL=jwt.js.map