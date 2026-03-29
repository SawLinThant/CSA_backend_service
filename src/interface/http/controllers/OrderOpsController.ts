import type { Request, Response } from 'express';
import { AdminGetSubscriptionOrderOpsSummaryUseCase } from '../../../application/orders/useCases/admin/AdminGetSubscriptionOrderOpsSummaryUseCase';
import { AdminListSubscriptionOrderCycleEventsUseCase } from '../../../application/orders/useCases/admin/AdminListSubscriptionOrderCycleEventsUseCase';
import { orderOpsValidators } from '../validators/orderOpsValidators';

const adminGetSubscriptionOrderOpsSummaryUseCase = new AdminGetSubscriptionOrderOpsSummaryUseCase();
const adminListSubscriptionOrderCycleEventsUseCase = new AdminListSubscriptionOrderCycleEventsUseCase();

export class OrderOpsController {
  async adminGetSubscriptionOrderOpsSummary(req: Request, res: Response) {
    const parseResult = orderOpsValidators.summaryQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await adminGetSubscriptionOrderOpsSummaryUseCase.execute(parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
    }
  }

  async adminListSubscriptionOrderCycleEvents(req: Request, res: Response) {
    const parseResult = orderOpsValidators.listCycleEventsQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await adminListSubscriptionOrderCycleEventsUseCase.execute(parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
    }
  }
}

