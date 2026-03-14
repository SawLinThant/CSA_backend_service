import { Router } from 'express';
import { CategoryController } from '../../../interface/http/controllers/CategoryController';
import { ProductController } from '../../../interface/http/controllers/ProductController';

const router = Router();
const categoryController = new CategoryController();
const productController = new ProductController();

router.get('/categories', (req, res) => categoryController.adminListCategories(req, res));
router.get('/categories/:id', (req, res) => categoryController.adminGetCategory(req, res));
router.get('/products', (req, res) => productController.publicListProducts(req, res));
router.get('/products/:id', (req, res) => productController.publicGetProduct(req, res));

export default router;
