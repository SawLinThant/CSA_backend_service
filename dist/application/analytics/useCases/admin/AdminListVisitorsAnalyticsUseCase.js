"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListVisitorsAnalyticsUseCase = void 0;
function getRangeParams(range) {
    const to = new Date();
    const from = new Date(to);
    switch (range) {
        case '7d':
            from.setDate(from.getDate() - 7);
            return { from, to, mode: 'day' };
        case '30d':
            from.setDate(from.getDate() - 30);
            return { from, to, mode: 'day' };
        case '90d':
            from.setDate(from.getDate() - 90);
            return { from, to, mode: 'day' };
        case '6m': {
            // Approximate 6 months as calendar months by rewinding to the first day of the month.
            // Repository will still build bins for the full set of months.
            const year = from.getFullYear();
            const month = from.getMonth();
            const rewindMonth = month - 5; // include current month => total 6 months
            from.setMonth(rewindMonth, 1);
            from.setHours(0, 0, 0, 0);
            return { from, to, mode: 'month' };
        }
        default: {
            from.setDate(from.getDate() - 30);
            return { from, to, mode: 'day' };
        }
    }
}
class AdminListVisitorsAnalyticsUseCase {
    constructor(analyticsRepository) {
        this.analyticsRepository = analyticsRepository;
    }
    async execute(query) {
        const { range } = query;
        const { from, to, mode } = getRangeParams(range);
        // The repository only uses `range` to decide how to bin; `mode` is derived here so we
        // can keep the repository API stable.
        return this.analyticsRepository.listVisitorsSeries({
            range,
            from: mode === 'month' ? new Date(from.getTime()) : from,
            to,
        });
    }
}
exports.AdminListVisitorsAnalyticsUseCase = AdminListVisitorsAnalyticsUseCase;
//# sourceMappingURL=AdminListVisitorsAnalyticsUseCase.js.map