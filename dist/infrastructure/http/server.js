"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const index_1 = require("./routes/index");
const app = (0, express_1.default)();
// CORS is handled at the reverse-proxy / server layer.
// Disable Helmet CORP so it does not block cross-origin API reads.
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
app.use(express_1.default.json());
(0, index_1.registerRoutes)(app);
app.use(errorMiddleware_1.errorMiddleware);
exports.default = app;
//# sourceMappingURL=server.js.map