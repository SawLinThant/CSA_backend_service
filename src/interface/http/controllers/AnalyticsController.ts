import type { Request, Response } from 'express';
import { PrismaAnalyticsRepository } from '../../../infrastructure/db/repositories/PrismaAnalyticsRepository';
import { AdminGetAnalyticsSummaryUseCase } from '../../../application/analytics/useCases/admin/AdminGetAnalyticsSummaryUseCase';
import { AdminListVisitorsAnalyticsUseCase } from '../../../application/analytics/useCases/admin/AdminListVisitorsAnalyticsUseCase';
import { analyticsValidators } from '../validators/analyticsValidators';

const analyticsRepository = new PrismaAnalyticsRepository();
const adminGetAnalyticsSummaryUseCase = new AdminGetAnalyticsSummaryUseCase(analyticsRepository);
const adminListVisitorsAnalyticsUseCase = new AdminListVisitorsAnalyticsUseCase(analyticsRepository);

export class AnalyticsController {
  async adminGetAnalyticsSummary(_req: Request, res: Response) {
    try {
      const result = await adminGetAnalyticsSummaryUseCase.execute();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to fetch analytics summary',
      });
    }
  }

  async adminListVisitorsSeries(req: Request, res: Response) {
    const parseResult = analyticsValidators.visitorsRangeQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }

    try {
      const result = await adminListVisitorsAnalyticsUseCase.execute(parseResult.data);
      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to fetch visitors analytics',
      });
    }
  }
}

