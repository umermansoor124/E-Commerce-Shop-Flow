import express from 'express'
import {
    createOrder,
    getMyOrders,
    getSingleOrder,
    getAllOrders,
    updateOrderStatus,
    deleteOrder
} from '../controllers/orderController.js'
import authMiddleware, { adminMiddleware } from '../middleware/authMiddleware.js'

const route = express.Router()

route.post('/', authMiddleware, createOrder)
route.get('/', authMiddleware, adminMiddleware, getAllOrders)
route.get('/myorders', authMiddleware, getMyOrders)
route.get('/:id', authMiddleware, getSingleOrder)
route.put('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);
route.delete("/:id", authMiddleware, deleteOrder)

export default route