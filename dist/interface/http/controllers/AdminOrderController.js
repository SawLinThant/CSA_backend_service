"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminOrderController = void 0;
const AdminListOrdersUseCase_1 = require("../../../application/orders/useCases/admin/AdminListOrdersUseCase");
const AdminGetOrderUseCase_1 = require("../../../application/orders/useCases/admin/AdminGetOrderUseCase");
const orderValidators_1 = require("../validators/orderValidators");
const adminListOrdersUseCase = new AdminListOrdersUseCase_1.AdminListOrdersUseCase();
const adminGetOrderUseCase = new AdminGetOrderUseCase_1.AdminGetOrderUseCase();
class AdminOrderController {
    async adminListOrders(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const parseResult = orderValidators_1.orderValidators.listCustomerOrdersQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await adminListOrdersUseCase.execute(parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            return res.status(500).json({ error: message });
        }
    }
    async adminGetOrder(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Order id required' });
        try {
            const result = await adminGetOrderUseCase.execute(id);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Not found';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(500).json({ error: message });
        }
    }
    async adminUpdateOrderStatus(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Order id required' });
        const parseResult = orderValidators_1.orderValidators.adminUpdateOrderStatus.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const updated = await (await Promise.resolve().then(() => __importStar(require('../../../infrastructure/db/prismaClient')))).default.order.update({
                where: { id },
                data: { status: parseResult.data.status },
            });
            return res.status(200).json({ id: updated.id, status: updated.status });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Update failed';
            if (message.includes('Record to update not found'))
                return res.status(404).json({ error: 'Order not found' });
            return res.status(400).json({ error: message });
        }
    }
    async adminUpsertDelivery(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Order id required' });
        const parseResult = orderValidators_1.orderValidators.adminUpsertDelivery.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const prisma = (await Promise.resolve().then(() => __importStar(require('../../../infrastructure/db/prismaClient')))).default;
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
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Update failed';
            if (message.includes('Foreign key constraint'))
                return res.status(404).json({ error: 'Order not found' });
            return res.status(400).json({ error: message });
        }
    }
}
exports.AdminOrderController = AdminOrderController;
//# sourceMappingURL=AdminOrderController.js.map