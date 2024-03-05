// categoryRoutes.js
import express from 'express';
import * as Category from '../Controllers/categoryController.js';
import upload from '../middleware/multer.js'; // Import Multer middleware

const router = express.Router();

router.get('/', Category.getCategories);
router.get('/:id', Category.getCategory);
router.post('/', upload.single('image'), Category.createCategory); // Use Multer middleware for single image upload
router.delete('/:id', Category.deleteCategory);
router.put('/:id', upload.single('image'), Category.updateCategory); // Use Multer middleware for single image upload

export default router;
