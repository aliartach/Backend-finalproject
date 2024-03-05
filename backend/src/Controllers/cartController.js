import CartItem from "../Models/CartItem.js";


export const addCartItem = async (req, res) => {
    const cartItem = new CartItem(req.body);
    try {
        let item = await CartItem.findOne({ userId, productId});
        if (item) {
            item.quantity += quantity;
            await item.save();
        } else {
            item = new CartItem({
                userId: req.body.userId,
                productId: req.body.productId,
                quantity: req.body.quantity
            });
            await item.save();
        }
            return res.status(200).json(item);

        }
        // const savedCartItem = await cartItem.save();
        // res.status(200).json(savedCartItem);
     catch (err) {
        res.status(500).json({ message: 'Error adding item to cart', error: error.message});
    }
}