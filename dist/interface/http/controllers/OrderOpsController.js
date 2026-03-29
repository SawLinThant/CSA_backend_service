"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderOpsController = void 0;
const AdminGetSubscriptionOrderOpsSummaryUseCase_1 = require("../../../application/orders/useCases/admin/AdminGetSubscriptionOrderOpsSummaryUseCase");
const AdminListSubscriptionOrderCycleEventsUseCase_1 = require("../../../application/orders/useCases/admin/AdminListSubscriptionOrderCycleEventsUseCase");
const orderOpsValidators_1 = require("../validators/orderOpsValidators");
const adminGetSubscriptionOrderOpsSummaryUseCase = new AdminGetSubscriptionOrderOpsSummaryUseCase_1.AdminGetSubscriptionOrderOpsSummaryUseCase();
const adminListSubscriptionOrderCycleEventsUseCase = new AdminListSubscriptionOrderCycleEventsUseCase_1.AdminListSubscriptionOrderCycleEventsUseCase();
class OrderOpsController {
    async adminGetSubscriptionOrderOpsSummary(req, res) {
        const parseResult = orderOpsValidators_1.orderOpsValidators.summaryQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await adminGetSubscriptionOrderOpsSummaryUseCase.execute(parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
        }
    }
    async adminListSubscriptionOrderCycleEvents(req, res) {
        const parseResult = orderOpsValidators_1.orderOpsValidators.listCycleEventsQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await adminListSubscriptionOrderCycleEventsUseCase.execute(parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
        }
    }
}
exports.OrderOpsController = OrderOpsController;
//# sourceMappingURL=OrderOpsController.js.map