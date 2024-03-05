import mongoose from "mongoose";

const Schema = mongoose.Schema;


const orderSchema = new Schema({
    client_id: 
        {
            type: Schema.Types.ObjectId,
            ref: 'Client'
        }
    ,
    status: {
        type: String,
        enum: ['Pending', 'Paid'],
         default: false
    },
   
    cart: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
       
        quantity: {
            type: Number,
            required: true,
            min: 0
        },
        price: {
            type: Number,
            required: true
        }
    }],
    total_price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

export default mongoose.model('Order', orderSchema)