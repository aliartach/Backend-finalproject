import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['fruits and nuts', 'yogurt', 'frozen', 'chocolate bar']
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema);

export default Category;
