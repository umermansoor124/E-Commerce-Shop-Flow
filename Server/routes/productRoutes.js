import express from 'express'
import {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js"
import authMiddleware, { adminMiddleware } from '../middleware/authMiddleware.js'


const route = express.Router()

route.get("/", getAllProducts)
route.get("/:id", getSingleProduct)
route.post("/", authMiddleware, adminMiddleware, createProduct)
route.put("/:id", authMiddleware, adminMiddleware, updateProduct)
route.delete("/:id", authMiddleware, adminMiddleware, deleteProduct)

export default route