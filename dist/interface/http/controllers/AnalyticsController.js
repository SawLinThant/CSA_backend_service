"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const PrismaAnalyticsRepository_1 = require("../../../infrastructure/db/repositories/PrismaAnalyticsRepository");
const AdminGetAnalyticsSummaryUseCase_1 = require("../../../application/analytics/useCases/admin/AdminGetAnalyticsSummaryUseCase");
const AdminListVisitorsAnalyticsUseCase_1 = require("../../../application/analytics/useCases/admin/AdminListVisitorsAnalyticsUseCase");
const analyticsValidators_1 = require("../validators/analyticsValidators");
const analyticsRepository = new PrismaAnalyticsRepository_1.PrismaAnalyticsRepository();
const adminGetAnalyticsSummaryUseCase = new AdminGetAnalyticsSummaryUseCase_1.AdminGetAnalyticsSummaryUseCase(analyticsRepository);
const adminListVisitorsAnalyticsUseCase = new AdminListVisitorsAnalyticsUseCase_1.AdminListVisitorsAnalyticsUseCase(analyticsRepository);
class AnalyticsController {
    async adminGetAnalyticsSummary(_req, res) {
        try {
            const result = await adminGetAnalyticsSummaryUseCase.execute();
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({
                error: error instanceof Error ? error.message : 'Failed to fetch analytics summary',
            });
        }
    }
    async adminListVisitorsSeries(req, res) {
        const parseResult = analyticsValidators_1.analyticsValidators.visitorsRangeQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await adminListVisitorsAnalyticsUseCase.execute(parseResult.data);
            return res.status(200).json({ data: result });
        }
        catch (error) {
            return res.status(500).json({
                error: error instanceof Error ? error.message : 'Failed to fetch visitors analytics',
            });
        }
    }
}
exports.AnalyticsController = AnalyticsController;
//# sourceMappingURL=AnalyticsController.js.map