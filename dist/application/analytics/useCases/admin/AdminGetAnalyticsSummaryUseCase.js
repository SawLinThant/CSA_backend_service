"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGetAnalyticsSummaryUseCase = void 0;
class AdminGetAnalyticsSummaryUseCase {
    constructor(analyticsRepository) {
        this.analyticsRepository = analyticsRepository;
    }
    async execute() {
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
exports.AdminGetAnalyticsSummaryUseCase = AdminGetAnalyticsSummaryUseCase;
//# sourceMappingURL=AdminGetAnalyticsSummaryUseCase.js.map