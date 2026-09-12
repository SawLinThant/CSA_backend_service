"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const logger_1 = require("../../../core/logging/logger");
function serializeError(err) {
    if (err instanceof Error) {
        return { name: err.name, message: err.message, stack: err.stack };
    }
    return err;
}
// Centralized error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorMiddleware(err, _req, res, _next) {
    logger_1.logger.error('Unhandled error', serializeError(err));
    res.status(500).json({
        error: 'Internal Server Error',
    });
}
//# sourceMappingURL=errorMiddleware.js.map