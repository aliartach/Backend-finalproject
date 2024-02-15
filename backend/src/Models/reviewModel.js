import mongoose from 'mongoose'
import Product from '../Models/productModel.js'
import Client from '../Models/clientModels.js'

const reviewSchema = new mongoose.Schema({
    rating: {
        type: String,
        required: true
    },
    reviewText: {
        type: String,
        required: true
    },
    clientID: {
        type: mongoose.Schema.Types.ObjectId, ref: "Client"
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId, ref: "Product"
    }
}, { timestamps: true})

reviewSchema.pre('find', function (next) {
this.populate([
    {
        path: 'productID',
        select: 'productName'
    },
    {
        path: 'clientID',
        select: 'email as clientEmail'
    }
]);
next();
});

export default mongoose.model('Review', reviewSchema)