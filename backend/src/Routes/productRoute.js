// productRoutes.js
import express from 'express';
import * as Product from '../Controllers/productController.js';
import upload from '../middleware/multer.js'; // Import Multer middleware

const router = express.Router();

router.get('/', Product.getProducts);
router.get('/:id', Product.getProduct);
router.post('/', upload.single('image'), Product.createProduct); // Use Multer middleware for single image upload
router.delete('/:id', Product.deleteProduct);
router.put('/:id', upload.single('image'), Product.updateProduct); // Use Multer middleware for single image upload

export default router;
