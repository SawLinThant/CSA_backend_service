"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPlanController = void 0;
const PrismaSubscriptionPlanRepository_1 = require("../../../infrastructure/db/repositories/PrismaSubscriptionPlanRepository");
const PrismaBoxRepository_1 = require("../../../infrastructure/db/repositories/PrismaBoxRepository");
const AdminListSubscriptionPlansUseCase_1 = require("../../../application/subscriptionPlans/useCases/admin/AdminListSubscriptionPlansUseCase");
const AdminGetSubscriptionPlanUseCase_1 = require("../../../application/subscriptionPlans/useCases/admin/AdminGetSubscriptionPlanUseCase");
const AdminCreateSubscriptionPlanUseCase_1 = require("../../../application/subscriptionPlans/useCases/admin/AdminCreateSubscriptionPlanUseCase");
const AdminUpdateSubscriptionPlanUseCase_1 = require("../../../application/subscriptionPlans/useCases/admin/AdminUpdateSubscriptionPlanUseCase");
const AdminDeleteSubscriptionPlanUseCase_1 = require("../../../application/subscriptionPlans/useCases/admin/AdminDeleteSubscriptionPlanUseCase");
const subscriptionPlanValidators_1 = require("../validators/subscriptionPlanValidators");
const subscriptionPlanRepository = new PrismaSubscriptionPlanRepository_1.PrismaSubscriptionPlanRepository();
const boxRepository = new PrismaBoxRepository_1.PrismaBoxRepository();
const adminListSubscriptionPlansUseCase = new AdminListSubscriptionPlansUseCase_1.AdminListSubscriptionPlansUseCase(subscriptionPlanRepository, boxRepository);
const adminGetSubscriptionPlanUseCase = new AdminGetSubscriptionPlanUseCase_1.AdminGetSubscriptionPlanUseCase(subscriptionPlanRepository);
const adminCreateSubscriptionPlanUseCase = new AdminCreateSubscriptionPlanUseCase_1.AdminCreateSubscriptionPlanUseCase(subscriptionPlanRepository, boxRepository);
const adminUpdateSubscriptionPlanUseCase = new AdminUpdateSubscriptionPlanUseCase_1.AdminUpdateSubscriptionPlanUseCase(subscriptionPlanRepository);
const adminDeleteSubscriptionPlanUseCase = new AdminDeleteSubscriptionPlanUseCase_1.AdminDeleteSubscriptionPlanUseCase(subscriptionPlanRepository);
class SubscriptionPlanController {
    async adminListSubscriptionPlans(req, res) {
        const parseResult = subscriptionPlanValidators_1.subscriptionPlanValidators.listSubscriptionPlansQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await adminListSubscriptionPlansUseCase.execute(parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(500).json({ error: message });
        }
    }
    async adminGetSubscriptionPlan(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Subscription plan id required' });
        try {
            const result = await adminGetSubscriptionPlanUseCase.execute(id);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
        }
    }
    async adminCreateSubscriptionPlan(req, res) {
        const parseResult = subscriptionPlanValidators_1.subscriptionPlanValidators.createSubscriptionPlan.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await adminCreateSubscriptionPlanUseCase.execute(parseResult.data);
            return res.status(201).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Create failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async adminUpdateSubscriptionPlan(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Subscription plan id required' });
        const parseResult = subscriptionPlanValidators_1.subscriptionPlanValidators.updateSubscriptionPlan.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await adminUpdateSubscriptionPlanUseCase.execute(id, parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Update failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async adminDeleteSubscriptionPlan(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Subscription plan id required' });
        try {
            await adminDeleteSubscriptionPlanUseCase.execute(id);
            return res.status(204).send();
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Delete failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            if (message.includes('Cannot delete'))
                return res.status(400).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async publicListSubscriptionPlans(req, res) {
        const parseResult = subscriptionPlanValidators_1.subscriptionPlanValidators.listSubscriptionPlansQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await adminListSubscriptionPlansUseCase.execute(parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(500).json({ error: message });
        }
    }
    async publicGetSubscriptionPlan(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Subscription plan id required' });
        try {
            const result = await adminGetSubscriptionPlanUseCase.execute(id);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
        }
    }
}
exports.SubscriptionPlanController = SubscriptionPlanController;
//# sourceMappingURL=SubscriptionPlanController.js.map