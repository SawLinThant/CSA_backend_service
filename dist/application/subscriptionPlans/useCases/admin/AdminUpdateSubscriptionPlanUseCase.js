"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateSubscriptionPlanUseCase = void 0;
class AdminUpdateSubscriptionPlanUseCase {
    constructor(subscriptionPlanRepository) {
        this.subscriptionPlanRepository = subscriptionPlanRepository;
    }
    async execute(id, input) {
        const plan = await this.subscriptionPlanRepository.findById(id);
        if (!plan)
            throw new Error('Subscription plan not found');
        return this.subscriptionPlanRepository.update(id, {
            ...(input.name !== undefined && { name: input.name }),
            ...(input.price !== undefined && { price: input.price }),
            ...(input.deliveryFrequency !== undefined && { deliveryFrequency: input.deliveryFrequency }),
            ...(input.deliveriesPerCycle !== undefined && { deliveriesPerCycle: input.deliveriesPerCycle }),
            ...(input.active !== undefined && { active: input.active }),
        });
    }
}
exports.AdminUpdateSubscriptionPlanUseCase = AdminUpdateSubscriptionPlanUseCase;
//# sourceMappingURL=AdminUpdateSubscriptionPlanUseCase.js.map