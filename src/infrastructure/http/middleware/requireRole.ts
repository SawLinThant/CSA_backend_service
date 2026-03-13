import type { NextFunction, Request, Response } from 'express';
import type { UserRole } from '../../../domain/users/User';

/**
 * Middleware that restricts access to the given roles. Must be used after authMiddleware.
 * Returns 401 if req.user is missing, 403 if the user's role is not allowed.
 */
export function requireRole(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    next();
  };
}
