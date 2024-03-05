import mongoose from 'mongoose';
import Category from '../Models/categoryModel.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
};

export const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Category not found!' });
        }
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found!' });
        }
        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        if (req.file) {
            // If image file is uploaded, update image URL
            updateData.image = req.file.path;
        }
        const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(200).json(updatedCategory);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update category', error: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Category not found!' });
        }
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found!' });
        }
        res.status(200).json({ message: 'Category was deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newCategory = await Category.create({
            name,
            description,
            image: req.file.path // Save image URL
        });
        res.status(201).json({ message: 'Category created successfully!', newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
