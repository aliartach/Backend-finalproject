import mongoose from 'mongoose'

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
        required: true,
        enum: ['no sugar added', 'dark chocolate', 'frozen', 'yogurt', 'milk chocolate', 'white chocolate', 'caramel']
    },
    details: {
        type: String
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
}, { timestamps: true })

productSchema.pre('find', function (next) {
    this.populate({
      path: 'categoryID',
      select: 'name'
    });
    next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
