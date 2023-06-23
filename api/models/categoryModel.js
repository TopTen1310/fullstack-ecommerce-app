import mongoose from "mongoose"
import slugify from "slugify"

const categoriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 4,
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        minLength: 10,
        maxLength: 100
    },
    image: {
        type: String,
        required: true,
    }
}, { timestamps: true })

categoriesSchema.pre('validate', function (next) {
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

export default mongoose.model('Category', categoriesSchema)