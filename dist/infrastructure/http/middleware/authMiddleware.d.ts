import type { NextFunction, Request, Response } from 'express';
/**
 * Middleware that verifies the JWT access token from the Authorization header
 * and attaches the decoded payload to req.user. Returns 401 if missing or invalid.
 */
export declare function authMiddleware(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=authMiddleware.d.ts.map