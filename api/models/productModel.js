import mongoose from 'mongoose'
import slugify from 'slugify'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    inStock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true,
    },
    imageName: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        validate: {
            validator: v => v.length > 0 && v[0].length > 0,
            message: props => "At least one category is needed"
        }
    },
    description: {
        type: String,
        minLength: 10,
        maxLength: 500
    },
    latest: {
        type: Boolean,
        required: true
    }
})

productSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
        const newTitle = this.title.trim().replace(/\s+/g, " ")
        this.title = newTitle[0].toUpperCase() + newTitle.slice(1).toLowerCase()
    }
    if (this.description) {
        let descSlices = this.description.split('.').map(desc => {
            if (desc) {
                const newDesc = desc.trim().replace(/\s+/g, " ")
                return newDesc[0].toUpperCase() + newDesc.slice(1).toLowerCase()
            }
        })
        this.description = descSlices.join(". ").trimEnd()
    }
    next()
})

export default mongoose.model('Product', productSchema)