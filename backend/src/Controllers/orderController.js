import mongoose from "mongoose";
import Order from "../Models/orderModel.js";
import Product from "../Models/productModel.js";
import { LocalStorage } from 'node-localstorage';

const localStorage = new LocalStorage('./test/cart');

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "no orders", error: error.message });
  }
};

export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Order not found" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const update = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, update, {
      new: true,
    });

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

// export const createOrder = async (req, res) => {
//     const { status, paymentMethod, orderedItems, clientID } = req.body;

//     try {
//         let totalPriceFromItems = 0;
//         for (const item of orderedItems) {
//             totalPriceFromItems += item.totalPrice;
//         }

//         const newOrder = await Order.create({
//             totalPrice: totalPriceFromItems,
//             status,
//             paymentMethod,
//             clientID,
//             orderedItems
//         });

//         res.status(201).json({ message: 'Order created successfully!', newOrder });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// };

export const NewOrder = async (req, res) => {
  try {
    const { cart } = req.body;

    const orderItems = [];

    if (!cart) {
      return res.status(400).json({ error: "Cart is not defined" });
    }

    for (let i = 0; i < cart.length; i++) {
      const product = await Product.findById(cart[i].product_id);
      const quantity = cart[i].quantity;

      await product.save();

      orderItems.push({
        product_id: product._id,
        quantity: quantity,
        price: product.price,
        name: product.name,
        image: product.image,
      });
    }

    const total_price = cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const order = await Order.create({
      client_id: req.user,
      cart: orderItems,
      total_price,
    });

    res.status(200).json({ success: "Order is created", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};


export const addToCart = async (req, res, next) => {
    const products = req.body.products;

    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    console.log("Cart",cart)

    for (let i = 0; i < products.length; i++) {
        // const { productId, size, color, quantity } = products[i];
        const product = await Product.findById(products[i].product_id);


        if (!product) {
            return res.status(404).json({ error: `Product with id ${products[i].product_id} not found `});
        }


        
        const existingItem = cart.findIndex(
            (item) => item.productId == products[i].product_id)

        if (existingItem !==-1) {
            cart[existingItem].quantity += products[i].quantity;
        } else {
            cart.push({
                productId: products[i].product_id,
                quantity: products[i].quantity,
                price: product.price,
                productName: product.productName,
                image: product.image,
            });
            console.log("NAme",cart.productName)
        }
    }

    // Save the updated cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(localStorage.getItem('cart'))
  


    res.status(200).json({ message: "Products added to cart successfully", cart });
};

export const removeFromCart = async (req, res) => {
    const productId = req.params.id;

    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    const index = cart.findIndex(
        (item) => item.productId === productId 
    );

    if (index >= 0) {
        cart.splice(index, 1);

        localStorage.setItem('cart', JSON.stringify(cart));

        res.status(200).json({ message: "Product removed from cart successfully", cart });
    } else {
        res.status(404).json({ error: "Product not found in cart" });
    }
};




export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Client not found!" });
    }

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found !" });
    }
    res.status(200).json({ message: "Order deleted successfully !", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
