import type { NextFunction, Request, Response } from 'express';
import { logger } from '../../../core/logging/logger';

function serializeError(err: unknown) {
  if (err instanceof Error) {
    return { name: err.name, message: err.message, stack: err.stack };
  }
  return err;
}

// Centralized error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  logger.error('Unhandled error', serializeError(err));

  res.status(500).json({
    error: 'Internal Server Error',
  });
}
