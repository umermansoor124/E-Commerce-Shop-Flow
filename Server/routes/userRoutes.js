import express from 'express';
import { getUsers, updateUserRole, deleteUser } from '../controllers/userController.js'; 
import authMiddleware, { adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getUsers);
router.put('/:id/role', authMiddleware, updateUserRole);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

export default router;