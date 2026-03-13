"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const logger_1 = require("../../../core/logging/logger");
// Centralized error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorMiddleware(err, _req, res, _next) {
    logger_1.logger.error('Unhandled error', err);
    res.status(500).json({
        error: 'Internal Server Error',
    });
}
//# sourceMappingURL=errorMiddleware.js.map