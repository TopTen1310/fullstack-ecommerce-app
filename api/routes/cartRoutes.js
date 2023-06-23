import express from 'express'
import { verifyUser } from '../middleware/tokenMiddleware.js'
import { createCart, getCart, deleteItem, deleteItems, updateQuantity } from '../controllers/cartController.js'

const router = express.Router()

router.route('/:userId')
    .get(verifyUser, getCart)
    .post(verifyUser, createCart)
    .put(verifyUser, updateQuantity)
    .delete(verifyUser, deleteItems)

router.delete('/:userId/:cartId', deleteItem)

export default router