import mongoose from 'mongoose'
import Product from '../Models/productModel.js'

export const getProducts = async (req,res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "error fetching all products", error: error.message })
    }
};
export const getProduct = async (req,res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Product not found!' });
          }
          const product = await Product.findById(id);
          
        if (!product) {
            return res.status(404).json({ error: 'Product not found!'});
        }
        res.status(200).json ({ product })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateProduct = async (req, res) => {
    const { id } = req.params; 
    const updateData = req.body; 

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
export const createProduct = async (req, res) => {
    const productData = req.body;

    try {
        const newProduct = new Product(productData);

        const savedProduct = await newProduct.save();

        return res.status(201).json(savedProduct);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};