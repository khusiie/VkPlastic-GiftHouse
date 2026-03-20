import { Router } from 'express';
import { createProduct, updateProduct, deleteProduct, listProducts, getProductById, searchProducts } from '../controllers/products';
import { errorHandler } from '../errorHandler';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const productRoutes: Router = Router();

productRoutes.post('/', [authMiddleware, adminMiddleware], errorHandler(createProduct));
productRoutes.put('/:id', [authMiddleware, adminMiddleware], errorHandler(updateProduct));
productRoutes.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteProduct));
productRoutes.get('/', [authMiddleware], errorHandler(listProducts));
productRoutes.get('/search', [authMiddleware], errorHandler(searchProducts));
productRoutes.get('/:id', [authMiddleware], errorHandler(getProductById));
export default productRoutes;
