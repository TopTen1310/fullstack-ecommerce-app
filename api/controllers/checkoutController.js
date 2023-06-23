import stripe from 'stripe'
import Cart from '../models/cartModel.js'
import dotenv from 'dotenv'

dotenv.config()

const stripeConfig = stripe(process.env.STRIPE)

export const checkout = async (req, res) => {

    try {
        const cartItems = await Cart.find({ _id: { $in: req.body } })
        const amount = cartItems.reduce((acc, item) => ((item.productPrice * item.quantity * 100) + acc), 0)

        const paymentIntent = await stripeConfig.paymentIntents.create({
            amount,
            currency: 'usd'
        })

        res.status(200).send(paymentIntent.client_secret)

    } catch (err) {
        res.status(500)
        throw new Error(err.message)
    }

}