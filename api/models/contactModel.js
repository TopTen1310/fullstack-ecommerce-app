import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

export default mongoose.model('Message', contactSchema)