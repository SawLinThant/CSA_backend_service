import { Router } from 'express';
import { AuthController } from '../../../interface/http/controllers/AuthController';
import { CategoryController } from '../../../interface/http/controllers/CategoryController';
import { ProductController } from '../../../interface/http/controllers/ProductController';
import { authMiddleware } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/requireRole';
import { productImagesUpload } from '../middleware/uploadMiddleware';

const router = Router();
const controller = new AuthController();
const categoryController = new CategoryController();
const productController = new ProductController();

router.post('/admin/login', (req, res) => controller.loginAdmin(req, res));
router.post('/customer/register', (req, res) => controller.customerRegister(req, res));
router.post('/customer/login', (req, res) => controller.loginCustomer(req, res));
router.post('/farmer/register', (req, res) => controller.farmerRegister(req, res));
router.post('/farmer/login', (req, res) => controller.loginFarmer(req, res));
router.post('/refresh', (req, res) => controller.refreshToken(req, res));

router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.patch('/customer/profile', authMiddleware, requireRole('customer'), (req, res) =>
  controller.updateCustomerProfile(req, res),
);
router.patch('/farmer/profile', authMiddleware, requireRole('farmer'), (req, res) =>
  controller.updateFarmerProfile(req, res),
);

router.get('/farmer/products', authMiddleware, requireRole('farmer'), (req, res) =>
  productController.farmerListMyProducts(req, res),
);
router.get('/farmer/products/:id', authMiddleware, requireRole('farmer'), (req, res) =>
  productController.farmerGetProduct(req, res),
);
router.post('/farmer/products', authMiddleware, requireRole('farmer'), (req, res) =>
  productController.farmerCreateProduct(req, res),
);
router.post(
  '/farmer/products/upload',
  authMiddleware,
  requireRole('farmer'),
  productImagesUpload,
  (req, res) => productController.farmerCreateProductWithUpload(req, res),
);
router.patch(
  '/farmer/products/:id/upload',
  authMiddleware,
  requireRole('farmer'),
  productImagesUpload,
  (req, res) => productController.farmerUpdateProductWithUpload(req, res),
);
router.patch('/farmer/products/:id', authMiddleware, requireRole('farmer'), (req, res) =>
  productController.farmerUpdateProduct(req, res),
);
router.delete('/farmer/products/:id', authMiddleware, requireRole('farmer'), (req, res) =>
  productController.farmerDeleteProduct(req, res),
);

router.get('/admin/customers', authMiddleware, requireRole('admin'), (req, res) =>
  controller.adminListCustomers(req, res),
);
router.get('/admin/farmers', authMiddleware, requireRole('admin'), (req, res) =>
  controller.adminListFarmers(req, res),
);
router.get('/admin/customers/:id', authMiddleware, requireRole('admin'), (req, res) =>
  controller.adminGetCustomer(req, res),
);
router.post('/admin/customers', authMiddleware, requireRole('admin'), (req, res) =>
  controller.adminCreateCustomer(req, res),
);
router.patch('/admin/customers/:id', authMiddleware, requireRole('admin'), (req, res) =>
  controller.adminUpdateCustomer(req, res),
);
router.delete('/admin/customers/:id', authMiddleware, requireRole('admin'), (req, res) =>
  controller.adminDeleteCustomer(req, res),
);

router.get('/admin/categories', authMiddleware, requireRole('admin'), (req, res) =>
  categoryController.adminListCategories(req, res),
);
router.get('/admin/categories/:id', authMiddleware, requireRole('admin'), (req, res) =>
  categoryController.adminGetCategory(req, res),
);
router.post('/admin/categories', authMiddleware, requireRole('admin'), (req, res) =>
  categoryController.adminCreateCategory(req, res),
);
router.patch('/admin/categories/:id', authMiddleware, requireRole('admin'), (req, res) =>
  categoryController.adminUpdateCategory(req, res),
);
router.delete('/admin/categories/:id', authMiddleware, requireRole('admin'), (req, res) =>
  categoryController.adminDeleteCategory(req, res),
);

export default router;

