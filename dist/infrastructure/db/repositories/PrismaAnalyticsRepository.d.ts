import type { AnalyticsRepository, AnalyticsSummary, VisitorsRange, VisitorsSeriesPoint } from '../../../domain/analytics/AnalyticsRepository';
export declare class PrismaAnalyticsRepository implements AnalyticsRepository {
    getAnalyticsSummary(params: {
        currentRevenueFrom: Date;
        currentRevenueTo: Date;
        previousRevenueFrom: Date;
        previousRevenueTo: Date;
        currentCustomersFrom: Date;
        currentCustomersTo: Date;
    }): Promise<AnalyticsSummary>;
    listVisitorsSeries(params: {
        range: VisitorsRange;
        from: Date;
        to: Date;
    }): Promise<VisitorsSeriesPoint[]>;
}
//# sourceMappingURL=PrismaAnalyticsRepository.d.ts.map