"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const index_1 = require("./routes/index");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express_1.default.json());
(0, index_1.registerRoutes)(app);
app.use(errorMiddleware_1.errorMiddleware);
exports.default = app;
//# sourceMappingURL=server.js.map