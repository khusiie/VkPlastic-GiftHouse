import { Router } from 'express';
import { createOrder, listOrders, changeStatus, listAllOrders, getOrderById, cancelOrder } from '../controllers/order';
import { errorHandler } from '../errorHandler';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const orderRoutes: Router = Router();

orderRoutes.post('/', [authMiddleware], errorHandler(createOrder));
orderRoutes.get('/', [authMiddleware], errorHandler(listOrders));
orderRoutes.put('/:id/cancel', [authMiddleware], errorHandler(cancelOrder));
orderRoutes.get('/index', [authMiddleware, adminMiddleware], errorHandler(listAllOrders));
orderRoutes.get('/:id', [authMiddleware], errorHandler(getOrderById));
orderRoutes.put('/:id/status', [authMiddleware, adminMiddleware], errorHandler(changeStatus));

export default orderRoutes;