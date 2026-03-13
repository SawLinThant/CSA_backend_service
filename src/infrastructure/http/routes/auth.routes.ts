import { Router } from 'express';
import { AuthController } from '../../../interface/http/controllers/AuthController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const controller = new AuthController();

router.post('/admin/login', (req, res) => controller.loginAdmin(req, res));
router.post('/customer/register', (req, res) => controller.customerRegister(req, res));
router.post('/customer/login', (req, res) => controller.loginCustomer(req, res));
router.post('/farmer/register', (req, res) => controller.farmerRegister(req, res));
router.post('/farmer/login', (req, res) => controller.loginFarmer(req, res));
router.post('/refresh', (req, res) => controller.refreshToken(req, res));

router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;

