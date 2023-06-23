import express from 'express'
import { getWishlists, createWishlist, deleteProduct, clearWishlist } from '../controllers/wishlistController.js'
import { verifyUser } from '../middleware/tokenMiddleware.js'

const router = express.Router()

router.route('/:userId')
    .get(verifyUser, getWishlists)
    .post(verifyUser, createWishlist)
    .delete(verifyUser, clearWishlist)

router.delete('/:userId/:wishId', verifyUser, deleteProduct)

export default router