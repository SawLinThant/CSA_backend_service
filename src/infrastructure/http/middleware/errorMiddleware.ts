import type { NextFunction, Request, Response } from 'express';
import { logger } from '../../../core/logging/logger';

// Centralized error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  logger.error('Unhandled error', err);

  res.status(500).json({
    error: 'Internal Server Error',
  });
}

