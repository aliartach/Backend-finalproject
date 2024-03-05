import express from 'express'
import * as Order from '../Controllers/orderController.js'

const router = express.Router();

router.get('/:id', Order.getOrder)
router.get('/', Order.getOrders)
router.post('/order', Order.NewOrder)
router.delete('/:id', Order.deleteOrder)
router.put('/:id', Order.updateOrder)
router.post('/cart',Order.addToCart)
router.delete('/cart/:id',Order.removeFromCart)
export default router