import express from 'express'
import { createOrder, getOrders, allOrders, updateOrder, deleteOrder } from '../controllers/orderControllers.js'
import { verifyUser, verifyAdmin } from '../middleware/tokenMiddleware.js'

const router = express.Router()

router.route('/:userId')
    .get(verifyUser, getOrders)
    .post(verifyUser, createOrder)

router.route('/')
    .get(verifyAdmin, allOrders)
    .put(verifyAdmin, updateOrder)

router.delete('/:orderId', verifyAdmin, deleteOrder)

export default router