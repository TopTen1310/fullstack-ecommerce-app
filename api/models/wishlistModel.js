import mongoose from 'mongoose'

const wishSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    productSlug: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    inStock: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('Wishlist', wishSchema)