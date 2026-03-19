export type AnalyticsSummary = {
    totalRevenue: number;
    newCustomers: number;
    activeAccounts: number;
    growthRate: number;
};
export type VisitorsSeriesPoint = {
    /**
     * Date key for charting.
     * - day mode: YYYY-MM-DD
     * - month mode: YYYY-MM-01
     */
    date: string;
    desktop: number;
    mobile: number;
};
export type VisitorsRange = '7d' | '30d' | '90d' | '6m';
export type VisitorsBinMode = 'day' | 'month';
export type VisitorsQuery = {
    range: VisitorsRange;
    from: Date;
    to: Date;
};
export interface AnalyticsRepository {
    getAnalyticsSummary(params: {
        currentRevenueFrom: Date;
        currentRevenueTo: Date;
        previousRevenueFrom: Date;
        previousRevenueTo: Date;
        currentCustomersFrom: Date;
        currentCustomersTo: Date;
    }): Promise<AnalyticsSummary>;
    listVisitorsSeries(params: VisitorsQuery): Promise<VisitorsSeriesPoint[]>;
}
//# sourceMappingURL=AnalyticsRepository.d.ts.map