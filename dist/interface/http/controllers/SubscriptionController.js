"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionController = void 0;
const PrismaCustomerRepository_1 = require("../../../infrastructure/db/repositories/PrismaCustomerRepository");
const PrismaSubscriptionPlanRepository_1 = require("../../../infrastructure/db/repositories/PrismaSubscriptionPlanRepository");
const PrismaSubscriptionRepository_1 = require("../../../infrastructure/db/repositories/PrismaSubscriptionRepository");
const CustomerCreateSubscriptionUseCase_1 = require("../../../application/subscriptions/useCases/customer/CustomerCreateSubscriptionUseCase");
const CustomerListMySubscriptionsUseCase_1 = require("../../../application/subscriptions/useCases/customer/CustomerListMySubscriptionsUseCase");
const CustomerGetSubscriptionUseCase_1 = require("../../../application/subscriptions/useCases/customer/CustomerGetSubscriptionUseCase");
const CustomerPauseSubscriptionUseCase_1 = require("../../../application/subscriptions/useCases/customer/CustomerPauseSubscriptionUseCase");
const CustomerCancelSubscriptionUseCase_1 = require("../../../application/subscriptions/useCases/customer/CustomerCancelSubscriptionUseCase");
const subscriptionValidators_1 = require("../validators/subscriptionValidators");
const customerRepository = new PrismaCustomerRepository_1.PrismaCustomerRepository();
const subscriptionPlanRepository = new PrismaSubscriptionPlanRepository_1.PrismaSubscriptionPlanRepository();
const subscriptionRepository = new PrismaSubscriptionRepository_1.PrismaSubscriptionRepository();
const customerCreateSubscriptionUseCase = new CustomerCreateSubscriptionUseCase_1.CustomerCreateSubscriptionUseCase(customerRepository, subscriptionPlanRepository, subscriptionRepository);
const customerListMySubscriptionsUseCase = new CustomerListMySubscriptionsUseCase_1.CustomerListMySubscriptionsUseCase(customerRepository, subscriptionRepository);
const customerGetSubscriptionUseCase = new CustomerGetSubscriptionUseCase_1.CustomerGetSubscriptionUseCase(customerRepository, subscriptionRepository);
const customerPauseSubscriptionUseCase = new CustomerPauseSubscriptionUseCase_1.CustomerPauseSubscriptionUseCase(customerRepository, subscriptionRepository);
const customerCancelSubscriptionUseCase = new CustomerCancelSubscriptionUseCase_1.CustomerCancelSubscriptionUseCase(customerRepository, subscriptionRepository);
class SubscriptionController {
    async customerListMySubscriptions(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const parseResult = subscriptionValidators_1.subscriptionValidators.listMySubscriptionsQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await customerListMySubscriptionsUseCase.execute(req.user.id, parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(500).json({ error: message });
        }
    }
    async customerGetSubscription(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Subscription id required' });
        try {
            const result = await customerGetSubscriptionUseCase.execute(req.user.id, id);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Not found';
            return res.status(404).json({ error: message });
        }
    }
    async customerCreateSubscription(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const parseResult = subscriptionValidators_1.subscriptionValidators.createSubscription.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await customerCreateSubscriptionUseCase.execute(req.user.id, parseResult.data);
            return res.status(201).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Create failed';
            if (message.includes('not found') || message.includes('not active'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async customerPauseSubscription(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Subscription id required' });
        const parseResult = subscriptionValidators_1.subscriptionValidators.pauseSubscription.safeParse(req.body ?? {});
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await customerPauseSubscriptionUseCase.execute(req.user.id, id, parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Pause failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            if (message.includes('Only active'))
                return res.status(400).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async customerCancelSubscription(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Subscription id required' });
        try {
            const result = await customerCancelSubscriptionUseCase.execute(req.user.id, id);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Cancel failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            if (message.includes('already cancelled'))
                return res.status(400).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
}
exports.SubscriptionController = SubscriptionController;
//# sourceMappingURL=SubscriptionController.js.map