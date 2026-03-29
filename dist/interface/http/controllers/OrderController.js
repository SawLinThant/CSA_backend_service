"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const PrismaCustomerRepository_1 = require("../../../infrastructure/db/repositories/PrismaCustomerRepository");
const CustomerListOrdersUseCase_1 = require("../../../application/orders/useCases/customer/CustomerListOrdersUseCase");
const CustomerGetOrderUseCase_1 = require("../../../application/orders/useCases/customer/CustomerGetOrderUseCase");
const orderValidators_1 = require("../validators/orderValidators");
const customerRepository = new PrismaCustomerRepository_1.PrismaCustomerRepository();
const customerListOrdersUseCase = new CustomerListOrdersUseCase_1.CustomerListOrdersUseCase(customerRepository);
const customerGetOrderUseCase = new CustomerGetOrderUseCase_1.CustomerGetOrderUseCase(customerRepository);
class OrderController {
    async customerListOrders(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const parseResult = orderValidators_1.orderValidators.listCustomerOrdersQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await customerListOrdersUseCase.execute(req.user.id, parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(500).json({ error: message });
        }
    }
    async customerGetOrder(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Order id required' });
        try {
            const result = await customerGetOrderUseCase.execute(req.user.id, id);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Not found';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(500).json({ error: message });
        }
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=OrderController.js.map