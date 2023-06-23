import express from 'express'
import { createProduct, getProducts, getProduct, deleteProduct, updateProduct } from '../controllers/productController.js'
import { verifyAdmin } from '../middleware/tokenMiddleware.js';

const router = express.Router()

router.get('/', getProducts)
router.post('/create', verifyAdmin, createProduct)
router.route('/:slug')
    .get(getProduct)
    .delete(verifyAdmin, deleteProduct)
    .put(verifyAdmin, updateProduct)

export default router