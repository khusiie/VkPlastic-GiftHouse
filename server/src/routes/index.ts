import { Router } from 'express';
import authRoutes from './auth';
import productRoutes from './products';
import addressRoutes from './users';
import cartRoutes from './cart';
import orderRoutes from './order';
const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productRoutes);
rootRouter.use('/addresses', addressRoutes);
rootRouter.use('/carts', cartRoutes);
rootRouter.use('/orders', orderRoutes);
export default rootRouter;