import express from 'express'
import * as Category from '../Controllers/categoryController.js'

const router = express.Router();

router.get('/', Category.getCategories)
router.get('/:id', Category.getCategory)
router.post('/', Category.createCategory)
router.delete('/:id', Category.deleteCategory)
router.put('/:id', Category.updateCategory)

export default router