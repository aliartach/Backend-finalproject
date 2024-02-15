import express from 'express'
import * as Product from '../Controllers/productController.js'

const router = express.Router();

router.get('/', Product.getProducts)
router.get('/:id', Product.getProduct)
router.post('/', Product.createProduct)
router.delete('/:id', Product.deleteProduct)
router.put('/:id', Product.updateProduct)

export default router