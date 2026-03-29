import type { CustomerRepository } from '../../../../domain/customers/CustomerRepository';
import type { SubscriptionPlanRepository } from '../../../../domain/subscriptions/SubscriptionPlanRepository';
import type { SubscriptionRepository } from '../../../../domain/subscriptions/SubscriptionRepository';
import type { CreateSubscriptionInput } from '../../dtos/subscriptionDtos';
export declare class CustomerCreateSubscriptionUseCase {
    private readonly customerRepository;
    private readonly subscriptionPlanRepository;
    private readonly subscriptionRepository;
    constructor(customerRepository: CustomerRepository, subscriptionPlanRepository: SubscriptionPlanRepository, subscriptionRepository: SubscriptionRepository);
    execute(userId: string, input: CreateSubscriptionInput): Promise<{
        reservation: {
            id: string;
            cycleDate: Date;
            status: import("../../../../generated/prisma/enums").ReservationStatus;
            idempotencyKey: string;
        };
        status: import("../../../../generated/prisma/enums").SubscriptionStatus;
        id: string;
        createdAt: Date;
        boxId: string | null;
        startDate: Date;
        customerId: string;
        planId: string;
        nextDeliveryDate: Date;
        nextOrderDate: Date | null;
        lastOrderDate: Date | null;
        pauseReason: string | null;
        pauseUntil: Date | null;
    }>;
}
//# sourceMappingURL=CustomerCreateSubscriptionUseCase.d.ts.map