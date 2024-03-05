import mongoose from 'mongoose';
import Product from '../Models/productModel.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate({ path: 'categoryID', select: 'name' });
        if (!products) {
            return res.status(404).json({ message: "No products available" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching all products", error: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Product not found!' });
        }
        const product = await Product.findById(id).populate({ path: 'categoryID', select: 'name' });
        if (!product) {
            return res.status(404).json({ error: 'Product not found!' });
        }
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    
    try {
        if (req.file) {
            // If image file is uploaded, update image URL
            updateData.image = req.file.path;
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Product not found!' });
        }
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found!' });
        }
        res.status(200).json({ message: 'Product deleted successfully!', deletedProduct: product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        console.log('Uploaded file:', req.file);
        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        // Extract other product data from the request body
        const { productName, description, price, quantity, weight, type, details, categoryID } = req.body;
        // Create a new product object with both image URL and other data
        const newProduct = new Product({
            productName,
            description,
            price,
            image: req.file.path, // Multer middleware stores the file path in req.file.path
            quantity,
            weight,
            type,
            details,
            categoryID
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();
        
        // Return the saved product as a JSON response
        return res.status(201).json(savedProduct);
    } catch (error) {
        // If an error occurs, return an error response
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
