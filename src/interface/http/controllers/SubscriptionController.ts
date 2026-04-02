import type { Request, Response } from 'express';
import { PrismaCustomerRepository } from '../../../infrastructure/db/repositories/PrismaCustomerRepository';
import { PrismaSubscriptionPlanRepository } from '../../../infrastructure/db/repositories/PrismaSubscriptionPlanRepository';
import { PrismaSubscriptionRepository } from '../../../infrastructure/db/repositories/PrismaSubscriptionRepository';
import { CustomerCreateSubscriptionUseCase } from '../../../application/subscriptions/useCases/customer/CustomerCreateSubscriptionUseCase';
import { CustomerListMySubscriptionsUseCase } from '../../../application/subscriptions/useCases/customer/CustomerListMySubscriptionsUseCase';
import { CustomerGetSubscriptionUseCase } from '../../../application/subscriptions/useCases/customer/CustomerGetSubscriptionUseCase';
import { CustomerPauseSubscriptionUseCase } from '../../../application/subscriptions/useCases/customer/CustomerPauseSubscriptionUseCase';
import { CustomerCancelSubscriptionUseCase } from '../../../application/subscriptions/useCases/customer/CustomerCancelSubscriptionUseCase';
import { subscriptionValidators } from '../validators/subscriptionValidators';

const customerRepository = new PrismaCustomerRepository();
const subscriptionPlanRepository = new PrismaSubscriptionPlanRepository();
const subscriptionRepository = new PrismaSubscriptionRepository();

function serializeSubscription(s: {
  id: string;
  customerId: string;
  planId: string;
  status: string;
  startDate: Date;
  nextDeliveryDate: Date;
  nextOrderDate: Date | null;
  pauseUntil: Date | null;
  createdAt: Date;
}) {
  return {
    id: s.id,
    customerId: s.customerId,
    planId: s.planId,
    status: s.status,
    startDate: s.startDate.toISOString(),
    nextDeliveryDate: s.nextDeliveryDate.toISOString(),
    nextOrderDate: s.nextOrderDate ? s.nextOrderDate.toISOString() : null,
    pauseUntil: s.pauseUntil ? s.pauseUntil.toISOString() : null,
    createdAt: s.createdAt.toISOString(),
  };
}

const customerCreateSubscriptionUseCase = new CustomerCreateSubscriptionUseCase(
  customerRepository,
  subscriptionPlanRepository,
  subscriptionRepository,
);
const customerListMySubscriptionsUseCase = new CustomerListMySubscriptionsUseCase(
  customerRepository,
  subscriptionRepository,
);
const customerGetSubscriptionUseCase = new CustomerGetSubscriptionUseCase(customerRepository, subscriptionRepository);
const customerPauseSubscriptionUseCase = new CustomerPauseSubscriptionUseCase(
  customerRepository,
  subscriptionRepository,
);
const customerCancelSubscriptionUseCase = new CustomerCancelSubscriptionUseCase(
  customerRepository,
  subscriptionRepository,
);

export class SubscriptionController {
  async customerListMySubscriptions(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const parseResult = subscriptionValidators.listMySubscriptionsQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await customerListMySubscriptionsUseCase.execute(req.user.id, parseResult.data);
      return res.status(200).json({
        ...result,
        items: result.items.map(serializeSubscription),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(500).json({ error: message });
    }
  }

  async customerGetSubscription(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Subscription id required' });
    try {
      const result = await customerGetSubscriptionUseCase.execute(req.user.id, id);
      return res.status(200).json(serializeSubscription(result));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Not found';
      return res.status(404).json({ error: message });
    }
  }

  async customerCreateSubscription(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const parseResult = subscriptionValidators.createSubscription.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await customerCreateSubscriptionUseCase.execute(req.user.id, parseResult.data);
      return res.status(201).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Create failed';
      if (message.includes('not found') || message.includes('not active')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async customerPauseSubscription(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Subscription id required' });
    const parseResult = subscriptionValidators.pauseSubscription.safeParse(req.body ?? {});
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await customerPauseSubscriptionUseCase.execute(req.user.id, id, parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Pause failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      if (message.includes('Only active')) return res.status(400).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async customerCancelSubscription(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Subscription id required' });
    try {
      const result = await customerCancelSubscriptionUseCase.execute(req.user.id, id);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Cancel failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      if (message.includes('already cancelled')) return res.status(400).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }
}
