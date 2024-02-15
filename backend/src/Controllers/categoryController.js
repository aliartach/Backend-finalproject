import mongoose from 'mongoose'
import Category from '../Models/categoryModel.js'

export const getCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "test", error: error.message });
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
  export const updateCategory =  async (req,res) => {
      const { id } = req.params; // Extract category ID from request params
      const { name, description } = req.body; // Extract updated data from request body
    
      try {
        // Check if the category exists
        const category = await Category.findById(id);
    
        if (!category) {
          return res.status(404).json({ message: 'Category not found', error: error.message });
        }
    
        // Update the category properties
        if (name) category.name = name;
        if (description) category.description = description;
    
        // Save the updated category
        const updatedCategory = await category.save();
    
        res.status(200).json(updatedCategory);
      } catch (error) {
        res.status(500).json({ message: 'Failed to update category', error: error.message });
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
  export const createCategory = async(req,res) => {
    const {name, description} = req.body;
try {
    const newCategory = await Category.create({
        name,
        description
    });

    res.status(201).json({ message: 'Category created succesfully!', newCategory});
} catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message});
}
  };