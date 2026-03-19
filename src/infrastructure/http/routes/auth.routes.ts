import { Router } from 'express';
import { AuthController } from '../../../interface/http/controllers/AuthController';
import { CategoryController } from '../../../interface/http/controllers/CategoryController';
import { ProductController } from '../../../interface/http/controllers/ProductController';
import { HarvestController } from '../../../interface/http/controllers/HarvestController';
import { BoxController } from '../../../interface/http/controllers/BoxController';
import { SubscriptionPlanController } from '../../../interface/http/controllers/SubscriptionPlanController';
import { SubscriptionController } from '../../../interface/http/controllers/SubscriptionController';
import { AnalyticsController } from '../../../interface/http/controllers/AnalyticsController';
import { authMiddleware } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/requireRole';
import { productImagesUpload, singleImageUpload } from '../middleware/uploadMiddleware';

const router = Router();
const controller = new AuthController();
const categoryController = new CategoryController();
const productController = new ProductController();
const harvestController = new HarvestController();
const boxController = new BoxController();
const subscriptionPlanController = new SubscriptionPlanController();
const subscriptionController = new SubscriptionController();
const analyticsController = new AnalyticsController();

router.post('/admin/login', (req, res) => controller.loginAdmin(req, res));
router.post('/customer/register', (req, res) => controller.customerRegister(req, res));
router.post('/customer/login', (req, res) => controller.loginCustomer(req, res));
router.post('/farmer/register', (req, res) => controller.farmerRegister(req, res));
router.post('/farmer/login', (req, res) => controller.loginFarmer(req, res));
router.post('/refresh', (req, res) => controller.refreshToken(req, res));
router.post('/logout', (req, res) => controller.logout(req, res));

router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.patch('/customer/profile', authMiddleware, requireRole('customer'), (req, res) =>
  controller.updateCustomerProfile(req, res),
);

router.get('/customer/subscriptions', authMiddleware, requireRole('customer'), (req, res) =>
  subscriptionController.customerListMySubscriptions(req, res),
);
router.post('/customer/subscriptions', authMiddleware, requireRole('customer'), (req, res) =>
  subscriptionController.customerCreateSubscription(req, res),
);
router.get('/customer/subscriptions/:id', authMiddleware, requireRole('customer'), (req, res) =>
  subscriptionController.customerGetSubscription(req, res),
);
router.patch('/customer/subscriptions/:id/pause', authMiddleware, requireRole('customer'), (req, res) =>
  subscriptionController.customerPauseSubscription(req, res),
);
router.patch('/customer/subscriptions/:id/cancel', authMiddleware, requireRole('customer'), (req, res) =>
  subscriptionController.customerCancelSubscription(req, res),
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

router.get('/farmer/harvests', authMiddleware, requireRole('farmer'), (req, res) =>
  harvestController.farmerListMyHarvests(req, res),
);
router.get('/farmer/harvests/:id', authMiddleware, requireRole('farmer'), (req, res) =>
  harvestController.farmerGetHarvest(req, res),
);
router.post('/farmer/harvests', authMiddleware, requireRole('farmer'), (req, res) =>
  harvestController.farmerCreateHarvest(req, res),
);
router.patch('/farmer/harvests/:id', authMiddleware, requireRole('farmer'), (req, res) =>
  harvestController.farmerUpdateHarvest(req, res),
);

router.get('/admin/harvests', authMiddleware, requireRole('admin'), (req, res) =>
  harvestController.adminListHarvests(req, res),
);
router.get('/admin/harvests/:id', authMiddleware, requireRole('admin'), (req, res) =>
  harvestController.adminGetHarvest(req, res),
);
router.patch('/admin/harvests/:id/approve', authMiddleware, requireRole('admin'), (req, res) =>
  harvestController.adminApproveHarvest(req, res),
);
router.patch('/admin/harvests/:id/reject', authMiddleware, requireRole('admin'), (req, res) =>
  harvestController.adminRejectHarvest(req, res),
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

router.get('/admin/boxes', authMiddleware, requireRole('admin'), (req, res) =>
  boxController.adminListBoxes(req, res),
);
router.get('/admin/boxes/:id', authMiddleware, requireRole('admin'), (req, res) =>
  boxController.adminGetBox(req, res),
);
router.post('/admin/boxes', authMiddleware, requireRole('admin'), (req, res) =>
  boxController.adminCreateBox(req, res),
);
router.post('/admin/boxes/upload', authMiddleware, requireRole('admin'), singleImageUpload, (req, res) =>
  boxController.adminCreateBoxWithUpload(req, res),
);
router.patch('/admin/boxes/:id/upload', authMiddleware, requireRole('admin'), singleImageUpload, (req, res) =>
  boxController.adminUpdateBoxWithUpload(req, res),
);
router.patch('/admin/boxes/:id', authMiddleware, requireRole('admin'), (req, res) =>
  boxController.adminUpdateBox(req, res),
);
router.delete('/admin/boxes/:id', authMiddleware, requireRole('admin'), (req, res) =>
  boxController.adminDeleteBox(req, res),
);

router.get('/admin/box-versions', authMiddleware, requireRole('admin'), (req, res) =>
  boxController.adminListBoxVersions(req, res),
);
router.get('/admin/box-versions/:id/items', authMiddleware, requireRole('admin'), (req, res) =>
  boxController.adminListBoxVersionItems(req, res),
);
router.get('/admin/box-versions/:id', authMiddleware, requireRole('admin'), (req, res) =>
  boxController.adminGetBoxVersion(req, res),
);
router.post('/admin/box-versions', authMiddleware, requireRole('admin'), (req, res) =>
  boxController.adminCreateBoxVersion(req, res),
);
router.patch('/admin/box-versions/:id', authMiddleware, requireRole('admin'), (req, res) =>
  boxController.adminUpdateBoxVersion(req, res),
);
router.delete('/admin/box-versions/:id', authMiddleware, requireRole('admin'), (req, res) =>
  boxController.adminDeleteBoxVersion(req, res),
);

router.post('/admin/box-items', authMiddleware, requireRole('admin'), (req, res) =>
  boxController.adminCreateBoxItem(req, res),
);
router.get('/admin/box-items/:id', authMiddleware, requireRole('admin'), (req, res) =>
  boxController.adminGetBoxItem(req, res),
);
router.patch('/admin/box-items/:id', authMiddleware, requireRole('admin'), (req, res) =>
  boxController.adminUpdateBoxItem(req, res),
);
router.delete('/admin/box-items/:id', authMiddleware, requireRole('admin'), (req, res) =>
  boxController.adminDeleteBoxItem(req, res),
);

router.get('/admin/subscription-plans', authMiddleware, requireRole('admin'), (req, res) =>
  subscriptionPlanController.adminListSubscriptionPlans(req, res),
);
router.get('/admin/subscription-plans/:id', authMiddleware, requireRole('admin'), (req, res) =>
  subscriptionPlanController.adminGetSubscriptionPlan(req, res),
);
router.post('/admin/subscription-plans', authMiddleware, requireRole('admin'), (req, res) =>
  subscriptionPlanController.adminCreateSubscriptionPlan(req, res),
);
router.patch('/admin/subscription-plans/:id', authMiddleware, requireRole('admin'), (req, res) =>
  subscriptionPlanController.adminUpdateSubscriptionPlan(req, res),
);
router.delete('/admin/subscription-plans/:id', authMiddleware, requireRole('admin'), (req, res) =>
  subscriptionPlanController.adminDeleteSubscriptionPlan(req, res),
);

router.patch('/admin/users/:id/toggle-status', authMiddleware, requireRole('admin'), (req, res) =>
  controller.adminToggleUserStatus(req, res),
);

router.get('/admin/analytics/summary', authMiddleware, requireRole('admin'), (req, res) =>
  analyticsController.adminGetAnalyticsSummary(req, res),
);
router.get('/admin/analytics/visitors', authMiddleware, requireRole('admin'), (req, res) =>
  analyticsController.adminListVisitorsSeries(req, res),
);

export default router;

