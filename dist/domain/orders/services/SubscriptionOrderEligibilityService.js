"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionOrderEligibilityService = void 0;
class SubscriptionOrderEligibilityService {
    evaluate(input) {
        if (input.status !== 'active')
            return { eligible: false, reason: 'inactive_subscription' };
        if (!input.nextOrderDate)
            return { eligible: false, reason: 'missing_next_order_date' };
        if (input.nextOrderDate > input.referenceDate)
            return { eligible: false, reason: 'not_due_yet' };
        if (!input.hasDeliveryAddress)
            return { eligible: false, reason: 'missing_delivery_address' };
        return { eligible: true };
    }
}
exports.SubscriptionOrderEligibilityService = SubscriptionOrderEligibilityService;
//# sourceMappingURL=SubscriptionOrderEligibilityService.js.map