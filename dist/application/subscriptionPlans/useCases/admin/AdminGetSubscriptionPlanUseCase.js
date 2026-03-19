"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGetSubscriptionPlanUseCase = void 0;
class AdminGetSubscriptionPlanUseCase {
    constructor(subscriptionPlanRepository) {
        this.subscriptionPlanRepository = subscriptionPlanRepository;
    }
    async execute(id) {
        const plan = await this.subscriptionPlanRepository.findById(id);
        if (!plan)
            throw new Error('Subscription plan not found');
        return plan;
    }
}
exports.AdminGetSubscriptionPlanUseCase = AdminGetSubscriptionPlanUseCase;
//# sourceMappingURL=AdminGetSubscriptionPlanUseCase.js.map