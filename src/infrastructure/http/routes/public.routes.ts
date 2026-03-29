import { Router } from 'express';
import { CategoryController } from '../../../interface/http/controllers/CategoryController';
import { ProductController } from '../../../interface/http/controllers/ProductController';
import { BoxController } from '../../../interface/http/controllers/BoxController';
import { SubscriptionPlanController } from '../../../interface/http/controllers/SubscriptionPlanController';

const router = Router();
const categoryController = new CategoryController();
const productController = new ProductController();
const boxController = new BoxController();
const subscriptionPlanController = new SubscriptionPlanController();

router.get('/categories', (req, res) => categoryController.adminListCategories(req, res));
router.get('/categories/:id', (req, res) => categoryController.adminGetCategory(req, res));
router.get('/products', (req, res) => productController.publicListProducts(req, res));
router.get('/products/:id', (req, res) => productController.publicGetProduct(req, res));

router.get('/boxes', (req, res) => boxController.publicListBoxes(req, res));
router.get('/boxes/:id', (req, res) => boxController.publicGetBox(req, res));
router.get('/boxes/:id/detail', (req, res) => boxController.publicGetBoxDetail(req, res));
router.get('/box-versions', (req, res) => boxController.publicListBoxVersions(req, res));
router.get('/box-versions/:id/items', (req, res) => boxController.publicListBoxVersionItems(req, res));
router.get('/box-versions/:id', (req, res) => boxController.publicGetBoxVersion(req, res));

router.get('/subscription-plans', (req, res) => subscriptionPlanController.publicListSubscriptionPlans(req, res));
router.get('/subscription-plans/:id', (req, res) => subscriptionPlanController.publicGetSubscriptionPlan(req, res));

export default router;
