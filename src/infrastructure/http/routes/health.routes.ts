import { Router } from 'express';
import prisma from '../../db/prismaClient';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    name: 'Farm-to-Table API',
    version: '1.0.0',
    health: '/health',
  });
});

router.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: 'ok',
      checks: {
        database: 'up',
      },
    });
  } catch (error) {
    res.status(503).json({
      status: 'degraded',
      checks: {
        database: 'down',
      },
      error: process.env.NODE_ENV === 'development' ? String(error) : undefined,
    });
  }
});

export default router;

