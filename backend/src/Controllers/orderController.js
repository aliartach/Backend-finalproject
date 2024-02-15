import mongoose from 'mongoose'
import Order from '../Models/orderModel.js'

export const getOrders = async (req,res) => {
    try {
        const orders = await Order.find();
        res.status(200),json(orders);
    } catch (error) {
        res.status(500).json({ message: "no orders", error: error.message})
    }
};

export const getOrder = async (req,res) => {
    const { id } = req.params;
    try {
        
    if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ error: 'Order not found'});
        }

    const order = await Order.findById(id)
        if(!order) {
            return res.status(404).json({ error: 'Order not found'});
        }
    
        res.status(200).json({order});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

export const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const update = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(orderId, update, { new: true });

        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ error: "Order not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

