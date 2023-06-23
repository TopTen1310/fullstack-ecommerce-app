import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc   create a product
// @route  POST api/product/create
// @access Private
export const createProduct = asyncHandler(async (req, res) => {
    const { title, inStock, price, productImage, categories, description, latest, imageName } = req.body
    let newProduct = new Product({ title, inStock, price, productImage, categories, latest, imageName })
    if (description) newProduct.description = description
    newProduct = await newProduct.save()
    res.status(201).json({ newProduct, message: 'Successfully created' })
})

// @desc   get all products
// @route  GET api/product/
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find(req.query)
    res.status(200).json(products)
})

// @desc   get one product
// @route  GET api/product/:slug
// @access Public
export const getProduct = asyncHandler(async (req, res) => {
    const { slug } = req.params
    const product = await Product.findOne({ slug })
    res.status(200).json(product)
})

// @desc   delete a product
// @route  DELETE api/product/:slug
// @access Private
export const deleteProduct = asyncHandler(async (req, res) => {
    const { slug } = req.params
    await Product.deleteOne({ slug })
    res.status(200).json({ slug, message: "Successfully deleted" })
})

// @desc   update a product
// @route  PUT api/product/:slug
// @access Private
export const updateProduct = asyncHandler(async (req, res) => {
    const { slug } = req.params
    const { title, price, inStock, productImage, description, latest } = req.body

    let product = await Product.findOne({ slug })

    product.title = title
    product.price = price
    product.inStock = inStock
    product.description = description
    product.latest = latest
    if (productImage) product.productImage = productImage

    const updatedProduct = await product.save()
    res.status(200).json({ updatedProduct, message: 'Successfully updated' })
})