import type { Request, Response } from 'express';
import { PrismaCustomerRepository } from '../../../infrastructure/db/repositories/PrismaCustomerRepository';
import { CustomerListOrdersUseCase } from '../../../application/orders/useCases/customer/CustomerListOrdersUseCase';
import { CustomerGetOrderUseCase } from '../../../application/orders/useCases/customer/CustomerGetOrderUseCase';
import { orderValidators } from '../validators/orderValidators';

const customerRepository = new PrismaCustomerRepository();
const customerListOrdersUseCase = new CustomerListOrdersUseCase(customerRepository);
const customerGetOrderUseCase = new CustomerGetOrderUseCase(customerRepository);

export class OrderController {
  async customerListOrders(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const parseResult = orderValidators.listCustomerOrdersQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await customerListOrdersUseCase.execute(req.user.id, parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(500).json({ error: message });
    }
  }

  async customerGetOrder(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Order id required' });
    try {
      const result = await customerGetOrderUseCase.execute(req.user.id, id);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Not found';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(500).json({ error: message });
    }
  }
}
