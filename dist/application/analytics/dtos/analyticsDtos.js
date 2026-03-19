"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitorsRangeQuerySchema = void 0;
const zod_1 = require("zod");
exports.visitorsRangeQuerySchema = zod_1.z.object({
    range: zod_1.z.enum(['7d', '30d', '90d', '6m']).optional().default('6m'),
});
//# sourceMappingURL=analyticsDtos.js.map