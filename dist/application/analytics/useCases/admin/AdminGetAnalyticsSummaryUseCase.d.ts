import type { AnalyticsRepository, AnalyticsSummary } from '../../../../domain/analytics/AnalyticsRepository';
export declare class AdminGetAnalyticsSummaryUseCase {
    private readonly analyticsRepository;
    constructor(analyticsRepository: AnalyticsRepository);
    execute(): Promise<AnalyticsSummary>;
}
//# sourceMappingURL=AdminGetAnalyticsSummaryUseCase.d.ts.map