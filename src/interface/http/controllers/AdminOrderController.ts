import type { Request, Response } from 'express';
import { AdminListOrdersUseCase } from '../../../application/orders/useCases/admin/AdminListOrdersUseCase';
import { AdminGetOrderUseCase } from '../../../application/orders/useCases/admin/AdminGetOrderUseCase';
import { orderValidators } from '../validators/orderValidators';

const adminListOrdersUseCase = new AdminListOrdersUseCase();
const adminGetOrderUseCase = new AdminGetOrderUseCase();

export class AdminOrderController {
  async adminListOrders(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const parseResult = orderValidators.listCustomerOrdersQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await adminListOrdersUseCase.execute(parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      return res.status(500).json({ error: message });
    }
  }

  async adminGetOrder(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Order id required' });
    try {
      const result = await adminGetOrderUseCase.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Not found';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(500).json({ error: message });
    }
  }

  async adminUpdateOrderStatus(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Order id required' });
    const parseResult = orderValidators.adminUpdateOrderStatus.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const updated = await (await import('../../../infrastructure/db/prismaClient')).default.order.update({
        where: { id },
        data: { status: parseResult.data.status },
      });
      return res.status(200).json({ id: updated.id, status: updated.status });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      if (message.includes('Record to update not found')) return res.status(404).json({ error: 'Order not found' });
      return res.status(400).json({ error: message });
    }
  }

  async adminUpsertDelivery(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Order id required' });
    const parseResult = orderValidators.adminUpsertDelivery.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const prisma = (await import('../../../infrastructure/db/prismaClient')).default;
      const delivery = await prisma.delivery.upsert({
        where: { orderId: id },
        create: {
          orderId: id,
          deliveryStatus: parseResult.data.deliveryStatus,
          deliveryDriver: parseResult.data.deliveryDriver ?? null,
          trackingCode: parseResult.data.trackingCode ?? null,
          deliveredAt: parseResult.data.deliveredAt ?? null,
        },
        update: {
          deliveryStatus: parseResult.data.deliveryStatus,
          ...(parseResult.data.deliveryDriver !== undefined ? { deliveryDriver: parseResult.data.deliveryDriver } : {}),
          ...(parseResult.data.trackingCode !== undefined ? { trackingCode: parseResult.data.trackingCode } : {}),
          ...(parseResult.data.deliveredAt !== undefined ? { deliveredAt: parseResult.data.deliveredAt } : {}),
        },
      });
      return res.status(200).json({
        orderId: delivery.orderId,
        deliveryStatus: delivery.deliveryStatus,
        deliveryDriver: delivery.deliveryDriver,
        trackingCode: delivery.trackingCode,
        deliveredAt: delivery.deliveredAt?.toISOString() ?? null,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      if (message.includes('Foreign key constraint')) return res.status(404).json({ error: 'Order not found' });
      return res.status(400).json({ error: message });
    }
  }
}

