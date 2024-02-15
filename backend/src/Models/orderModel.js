import mongoose from 'mongoose'
import Client from '../Models/clientModels.js'
import Product from '../Models/productModel.js'
import { Timestamp } from 'mongodb';

const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "in progress", "delivered"],
    },
    paymentMethod: {
        type: String,
        default: "Cash"
    },
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
    orderedItems: [orderItemSchema]
}, {timestamps: true} );

orderSchema.pre('find', function (next) {
    this.populate({
        path: 'clientID',
        select: 'email, phonenumber, address'
    }).populate({
        path: 'orderedItems.product',
        select: 'productName description price image quantity weight type details categoryID'
    });
    next();
});

export default mongoose.model('Order', orderSchema)