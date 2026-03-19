"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDeleteSubscriptionPlanUseCase = void 0;
class AdminDeleteSubscriptionPlanUseCase {
    constructor(subscriptionPlanRepository) {
        this.subscriptionPlanRepository = subscriptionPlanRepository;
    }
    async execute(id) {
        const plan = await this.subscriptionPlanRepository.findById(id);
        if (!plan)
            throw new Error('Subscription plan not found');
        const count = await this.subscriptionPlanRepository.countSubscriptionsByPlanId(id);
        if (count > 0)
            throw new Error('Cannot delete plan that has active subscriptions. Cancel or remove subscriptions first.');
        await this.subscriptionPlanRepository.delete(id);
    }
}
exports.AdminDeleteSubscriptionPlanUseCase = AdminDeleteSubscriptionPlanUseCase;
//# sourceMappingURL=AdminDeleteSubscriptionPlanUseCase.js.map