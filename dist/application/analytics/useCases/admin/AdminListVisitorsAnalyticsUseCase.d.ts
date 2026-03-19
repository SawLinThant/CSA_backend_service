import type { AnalyticsRepository, VisitorsSeriesPoint } from '../../../../domain/analytics/AnalyticsRepository';
import type { VisitorsRangeQueryInput } from '../../dtos/analyticsDtos';
export declare class AdminListVisitorsAnalyticsUseCase {
    private readonly analyticsRepository;
    constructor(analyticsRepository: AnalyticsRepository);
    execute(query: VisitorsRangeQueryInput): Promise<VisitorsSeriesPoint[]>;
}
//# sourceMappingURL=AdminListVisitorsAnalyticsUseCase.d.ts.map