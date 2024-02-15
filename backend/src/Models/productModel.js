import mongoose from 'mongoose'
import Category from '../Models/categoryModel.js'

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true 
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    details: {
        type: String
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId, ref: "Category"
    }
})

productSchema.pre('find', function (next) {
    this.populate({
      path: 'categoryID',
      select: 'name'
    });
    next();
  });

export default mongoose.model('Product', productSchema)
