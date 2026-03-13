"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.verifyAccessToken = verifyAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
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
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, env_1.env.REFRESH_TOKEN_SECRET);
}
//# sourceMappingURL=jwt.js.map