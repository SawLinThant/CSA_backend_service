import {
  createSubscriptionSchema,
  listMySubscriptionsQuerySchema,
  pauseSubscriptionSchema,
} from '../../../application/subscriptions/dtos/subscriptionDtos';

export const subscriptionValidators = {
  createSubscription: createSubscriptionSchema,
  listMySubscriptionsQuery: listMySubscriptionsQuerySchema,
  pauseSubscription: pauseSubscriptionSchema,
};
