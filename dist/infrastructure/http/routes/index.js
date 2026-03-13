"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const health_routes_1 = __importDefault(require("./health.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
function registerRoutes(app) {
    app.use('/', health_routes_1.default);
    app.use('/auth', auth_routes_1.default);
}
//# sourceMappingURL=index.js.map