"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("../infrastructure/http/server"));
const logger_1 = require("../core/logging/logger");
const PORT = process.env.PORT || 4000;
const server = http_1.default.createServer(server_1.default);
server.listen(PORT, () => {
    logger_1.logger.info(`HTTP server listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map