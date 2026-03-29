import type { SubscriptionStatus } from '../../subscriptions/Subscription';

export type SubscriptionOrderIneligibilityReason =
  | 'inactive_subscription'
  | 'missing_next_order_date'
  | 'not_due_yet'
  | 'missing_delivery_address';

export type SubscriptionOrderEligibility =
  | { eligible: true }
  | { eligible: false; reason: SubscriptionOrderIneligibilityReason };

export class SubscriptionOrderEligibilityService {
  evaluate(input: {
    status: SubscriptionStatus;
    nextOrderDate: Date | null;
    referenceDate: Date;
    hasDeliveryAddress: boolean;
  }): SubscriptionOrderEligibility {
    if (input.status !== 'active') return { eligible: false, reason: 'inactive_subscription' };
    if (!input.nextOrderDate) return { eligible: false, reason: 'missing_next_order_date' };
    if (input.nextOrderDate > input.referenceDate) return { eligible: false, reason: 'not_due_yet' };
    if (!input.hasDeliveryAddress) return { eligible: false, reason: 'missing_delivery_address' };
    return { eligible: true };
  }
}

