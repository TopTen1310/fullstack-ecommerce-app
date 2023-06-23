import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    method: {
        type: String,
        default: 'Card'
    },
    address: {
        type: String,
        required: true
    },
    orders: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    deliveryStatus: {
        type: String,
        default: 'Pending'
    },
    paymentInfo: {
        paymentId: {
            type: String,
            required: true
        },
        paymentStatus: {
            type: String,
            required: true
        }
    }
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)