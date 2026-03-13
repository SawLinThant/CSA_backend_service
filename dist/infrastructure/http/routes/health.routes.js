"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prismaClient_1 = __importDefault(require("../../db/prismaClient"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.status(200).json({
        name: 'Farm-to-Table API',
        version: '1.0.0',
        health: '/health',
    });
});
router.get('/health', async (_req, res) => {
    try {
        await prismaClient_1.default.$queryRaw `SELECT 1`;
        res.status(200).json({
            status: 'ok',
            checks: {
                database: 'up',
            },
        });
    }
    catch (error) {
        res.status(503).json({
            status: 'degraded',
            checks: {
                database: 'down',
            },
            error: process.env.NODE_ENV === 'development' ? String(error) : undefined,
        });
    }
});
exports.default = router;
//# sourceMappingURL=health.routes.js.map