import type { SubscriptionStatus } from '../../subscriptions/Subscription';
export type SubscriptionOrderIneligibilityReason = 'inactive_subscription' | 'missing_next_order_date' | 'not_due_yet' | 'missing_delivery_address';
export type SubscriptionOrderEligibility = {
    eligible: true;
} | {
    eligible: false;
    reason: SubscriptionOrderIneligibilityReason;
};
export declare class SubscriptionOrderEligibilityService {
    evaluate(input: {
        status: SubscriptionStatus;
        nextOrderDate: Date | null;
        referenceDate: Date;
        hasDeliveryAddress: boolean;
    }): SubscriptionOrderEligibility;
}
//# sourceMappingURL=SubscriptionOrderEligibilityService.d.ts.map