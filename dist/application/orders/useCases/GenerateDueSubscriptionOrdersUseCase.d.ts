import { CycleDateCalculator } from '../../../domain/orders/services/CycleDateCalculator';
import { SubscriptionOrderEligibilityService } from '../../../domain/orders/services/SubscriptionOrderEligibilityService';
import { OrderFromSubscriptionFactory } from '../../../domain/orders/services/OrderFromSubscriptionFactory';
export interface GenerateDueSubscriptionOrdersResult {
    referenceDate: Date;
    scanned: number;
    created: number;
    skipped: number;
    failed: number;
}
export declare class GenerateDueSubscriptionOrdersUseCase {
    private readonly cycleDateCalculator;
    private readonly eligibilityService;
    private readonly orderFactory;
    constructor(cycleDateCalculator?: CycleDateCalculator, eligibilityService?: SubscriptionOrderEligibilityService, orderFactory?: OrderFromSubscriptionFactory);
    execute(referenceDate?: Date, batchSize?: number, attempt?: number): Promise<GenerateDueSubscriptionOrdersResult>;
    private processSubscription;
}
//# sourceMappingURL=GenerateDueSubscriptionOrdersUseCase.d.ts.map