"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCreateSubscriptionPlanUseCase = void 0;
class AdminCreateSubscriptionPlanUseCase {
    constructor(subscriptionPlanRepository, boxRepository) {
        this.subscriptionPlanRepository = subscriptionPlanRepository;
        this.boxRepository = boxRepository;
    }
    async execute(input) {
        const box = await this.boxRepository.findById(input.boxId);
        if (!box)
            throw new Error('Box not found');
        return this.subscriptionPlanRepository.create({
            boxId: input.boxId,
            name: input.name,
            price: input.price,
            deliveryFrequency: input.deliveryFrequency,
            deliveriesPerCycle: input.deliveriesPerCycle,
            active: input.active ?? true,
        });
    }
}
exports.AdminCreateSubscriptionPlanUseCase = AdminCreateSubscriptionPlanUseCase;
//# sourceMappingURL=AdminCreateSubscriptionPlanUseCase.js.map