import type { Request, Response } from 'express';
import { PrismaSubscriptionPlanRepository } from '../../../infrastructure/db/repositories/PrismaSubscriptionPlanRepository';
import { PrismaBoxRepository } from '../../../infrastructure/db/repositories/PrismaBoxRepository';
import { AdminListSubscriptionPlansUseCase } from '../../../application/subscriptionPlans/useCases/admin/AdminListSubscriptionPlansUseCase';
import { AdminGetSubscriptionPlanUseCase } from '../../../application/subscriptionPlans/useCases/admin/AdminGetSubscriptionPlanUseCase';
import { AdminCreateSubscriptionPlanUseCase } from '../../../application/subscriptionPlans/useCases/admin/AdminCreateSubscriptionPlanUseCase';
import { AdminUpdateSubscriptionPlanUseCase } from '../../../application/subscriptionPlans/useCases/admin/AdminUpdateSubscriptionPlanUseCase';
import { AdminDeleteSubscriptionPlanUseCase } from '../../../application/subscriptionPlans/useCases/admin/AdminDeleteSubscriptionPlanUseCase';
import { subscriptionPlanValidators } from '../validators/subscriptionPlanValidators';

const subscriptionPlanRepository = new PrismaSubscriptionPlanRepository();
const boxRepository = new PrismaBoxRepository();

const adminListSubscriptionPlansUseCase = new AdminListSubscriptionPlansUseCase(
  subscriptionPlanRepository,
  boxRepository,
);
const adminGetSubscriptionPlanUseCase = new AdminGetSubscriptionPlanUseCase(subscriptionPlanRepository);
const adminCreateSubscriptionPlanUseCase = new AdminCreateSubscriptionPlanUseCase(
  subscriptionPlanRepository,
  boxRepository,
);
const adminUpdateSubscriptionPlanUseCase = new AdminUpdateSubscriptionPlanUseCase(subscriptionPlanRepository);
const adminDeleteSubscriptionPlanUseCase = new AdminDeleteSubscriptionPlanUseCase(subscriptionPlanRepository);

export class SubscriptionPlanController {
  async adminListSubscriptionPlans(req: Request, res: Response) {
    const parseResult = subscriptionPlanValidators.listSubscriptionPlansQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await adminListSubscriptionPlansUseCase.execute(parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(500).json({ error: message });
    }
  }

  async adminGetSubscriptionPlan(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Subscription plan id required' });
    try {
      const result = await adminGetSubscriptionPlanUseCase.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
    }
  }

  async adminCreateSubscriptionPlan(req: Request, res: Response) {
    const parseResult = subscriptionPlanValidators.createSubscriptionPlan.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await adminCreateSubscriptionPlanUseCase.execute(parseResult.data);
      return res.status(201).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Create failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async adminUpdateSubscriptionPlan(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Subscription plan id required' });
    const parseResult = subscriptionPlanValidators.updateSubscriptionPlan.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await adminUpdateSubscriptionPlanUseCase.execute(id, parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async adminDeleteSubscriptionPlan(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Subscription plan id required' });
    try {
      await adminDeleteSubscriptionPlanUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Delete failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      if (message.includes('Cannot delete')) return res.status(400).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async publicListSubscriptionPlans(req: Request, res: Response) {
    const parseResult = subscriptionPlanValidators.listSubscriptionPlansQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await adminListSubscriptionPlansUseCase.execute(parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(500).json({ error: message });
    }
  }

  async publicGetSubscriptionPlan(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Subscription plan id required' });
    try {
      const result = await adminGetSubscriptionPlanUseCase.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
    }
  }
}
