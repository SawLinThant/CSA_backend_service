"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwt_1 = require("../../../core/security/jwt");
const BEARER_PREFIX = 'Bearer ';
/**
 * Middleware that verifies the JWT access token from the Authorization header
 * and attaches the decoded payload to req.user. Returns 401 if missing or invalid.
 */
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith(BEARER_PREFIX)) {
        res.status(401).json({ error: 'Missing or invalid Authorization header' });
        return;
    }
    const token = authHeader.slice(BEARER_PREFIX.length).trim();
    if (!token) {
        res.status(401).json({ error: 'Missing or invalid Authorization header' });
        return;
    }
    try {
        const payload = (0, jwt_1.verifyAccessToken)(token);
        req.user = {
            id: payload.sub,
            role: payload.role,
        };
        next();
    }
    catch {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
}
//# sourceMappingURL=authMiddleware.js.map