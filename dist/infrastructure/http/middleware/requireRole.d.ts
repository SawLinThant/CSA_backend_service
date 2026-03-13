import type { NextFunction, Request, Response } from 'express';
import type { UserRole } from '../../../domain/users/User';
/**
 * Middleware that restricts access to the given roles. Must be used after authMiddleware.
 * Returns 401 if req.user is missing, 403 if the user's role is not allowed.
 */
export declare function requireRole(...allowedRoles: UserRole[]): (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=requireRole.d.ts.map