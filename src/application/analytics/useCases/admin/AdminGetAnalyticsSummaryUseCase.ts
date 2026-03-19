import type { AnalyticsRepository, AnalyticsSummary } from '../../../../domain/analytics/AnalyticsRepository';

export class AdminGetAnalyticsSummaryUseCase {
  constructor(private readonly analyticsRepository: AnalyticsRepository) {}

  async execute(): Promise<AnalyticsSummary> {
    // "This month" style metrics: last 30 days vs previous 30 days.
    const now = new Date();
    const currentRevenueTo = now;
    const currentRevenueFrom = new Date(now);
    currentRevenueFrom.setDate(now.getDate() - 30);

    const previousRevenueTo = currentRevenueFrom;
    const previousRevenueFrom = new Date(previousRevenueTo);
    previousRevenueFrom.setDate(previousRevenueTo.getDate() - 30);

    const currentCustomersFrom = new Date(currentRevenueFrom);
    const currentCustomersTo = new Date(currentRevenueTo);

    return this.analyticsRepository.getAnalyticsSummary({
      currentRevenueFrom,
      currentRevenueTo,
      previousRevenueFrom,
      previousRevenueTo,
      currentCustomersFrom,
      currentCustomersTo,
    });
  }
}

