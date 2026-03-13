"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../../../interface/http/controllers/AuthController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
const controller = new AuthController_1.AuthController();
router.post('/admin/login', (req, res) => controller.loginAdmin(req, res));
router.post('/customer/register', (req, res) => controller.customerRegister(req, res));
router.post('/customer/login', (req, res) => controller.loginCustomer(req, res));
router.post('/farmer/register', (req, res) => controller.farmerRegister(req, res));
router.post('/farmer/login', (req, res) => controller.loginFarmer(req, res));
router.post('/refresh', (req, res) => controller.refreshToken(req, res));
router.get('/me', authMiddleware_1.authMiddleware, (req, res) => {
    res.status(200).json({ user: req.user });
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map