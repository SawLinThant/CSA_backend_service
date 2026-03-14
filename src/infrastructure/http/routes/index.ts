import type { Express } from 'express';
import healthRouter from './health.routes';
import authRouter from './auth.routes';
import publicRouter from './public.routes';

export function registerRoutes(app: Express): void {
  app.use('/', healthRouter);
  app.use('/auth', authRouter);
  app.use('/api', publicRouter);
}

