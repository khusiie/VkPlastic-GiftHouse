import { Router } from 'express';
import { addAddress, deleteAddress, listAddresses, updateAddress, updateUser, listUsers, getUserById, changeUserRole } from '../controllers/users';
import { errorHandler } from '../errorHandler';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const addressRoutes: Router = Router();

addressRoutes.post('/', [authMiddleware], errorHandler(addAddress));
addressRoutes.delete('/:id', [authMiddleware], errorHandler(deleteAddress));
addressRoutes.get('/', [authMiddleware], errorHandler(listAddresses));
addressRoutes.put('/:id', [authMiddleware], errorHandler(updateAddress));
addressRoutes.put('/update', [authMiddleware], errorHandler(updateUser));

// Admin routes
addressRoutes.get('/all', [authMiddleware, adminMiddleware], errorHandler(listUsers));
addressRoutes.get('/:id', [authMiddleware, adminMiddleware], errorHandler(getUserById));
addressRoutes.put('/:id/role', [authMiddleware, adminMiddleware], errorHandler(changeUserRole));

export default addressRoutes;
