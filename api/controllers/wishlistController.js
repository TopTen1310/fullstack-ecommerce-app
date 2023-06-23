import asyncHandler from 'express-async-handler'
import Wishlist from '../models/wishlistModel.js'
import Cart from '../models/cartModel.js'

// @desc   get clients wishlists
// @route  GET api/wishlist/:userId
// @access Private
export const getWishlists = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const clientsWishlist = await Wishlist.find({ userId })
    res.status(200).json(clientsWishlist)
})

// @desc   create clients wishlist
// @route  POST api/wishlist/:userId
// @access Private
export const createWishlist = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const { productName, productPrice, productImage, productSlug, inStock } = req.body

    const cartProduct = await Cart.findOne({ userId, productSlug })
    if (cartProduct) {
        res.status(400)
        throw new Error('Product is in your cart')
    }

    const checkWish = await Wishlist.countDocuments({ userId, productSlug })
    if (checkWish) {
        res.status(400)
        throw new Error('Already in your wishlist')
    }

    let newWishlist = new Wishlist({ userId, productSlug, productName, productPrice, productImage, inStock })
    newWishlist = await newWishlist.save()
    res.status(200).json(newWishlist)
})

// @desc   remove product from clients wishlist
// @route  DELETE api/wishlist/:userId/:wishId
// @access Private
export const deleteProduct = asyncHandler(async (req, res) => {
    const { wishId } = req.params
    await Wishlist.deleteOne({ _id: wishId })
    res.status(200).json({ message: 'successfully removed the product', wishId })
})

// @desc   clear clients wishlist
// @route  DELETE api/wishlist/:userId
// @access Private
export const clearWishlist = asyncHandler(async (req, res) => {
    const { userId } = req.params
    await Wishlist.deleteMany({ userId })
    res.status(200).json({ message: 'successfully removed all products' })
})