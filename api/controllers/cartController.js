import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'
import Wishlist from '../models/wishlistModel.js'
import Product from '../models/productModel.js'

// @desc   get items from cart
// @route  GET api/cart/:userId
// @access Private
export const getCart = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const clientsCart = await Cart.find({ userId })
    res.status(200).json(clientsCart)
})

// @desc   create clients cart
// @route  POST api/cart/:userId
// @access Private
export const createCart = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const { productName, productPrice, productImage, productSlug, quantity, inStock } = req.body

    const checkCart = await Cart.countDocuments({ userId, productSlug })
    if (checkCart) {
        res.status(400)
        throw new Error('Already in your cart')
    }

    await Wishlist.deleteOne({ userId, productSlug })

    let cartItem = new Cart({ userId, productSlug, productName, productPrice, productImage, quantity, inStock })
    cartItem = await cartItem.save()
    res.status(200).json(cartItem)
})

// @desc   delete item from cart
// @route  DELETE api/cart/:userId/:cartId
// @access Private
export const deleteItem = asyncHandler(async (req, res) => {
    const { cartId } = req.params
    await Cart.deleteOne({ _id: cartId })
    res.status(200).json({ message: 'Successfully removed from cart', cartId })
})

// @desc   delete items in cart
// @route  DELETE api/cart/:userId
// @access Private
export const deleteItems = asyncHandler(async (req, res) => {
    const userId = req.user.id
    await Cart.deleteMany({ userId })
    res.status(200).json({ message: 'Successfully removed all products' })
})

// @desc   update quantity in cart
// @route  PUT api/cart/:userId
// @access Private
export const updateQuantity = asyncHandler(async (req, res) => {
    const { quantity, cartId } = req.body
    await Cart.updateOne({ _id: cartId }, { $set: { quantity } })
    res.status(200).json({ message: 'Successfully updated', cartId, quantity })
})