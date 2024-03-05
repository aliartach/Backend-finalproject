import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors'
import dotenv from 'dotenv'
import globalErrorHandler from './middleware/globalErrorHandler.js';
import connectDB from './config/db.js';
import Admin from './Routes/adminRoute.js'
import Client from './Routes/clientRoute.js'
import Category from './Routes/categoryRoute.js'
import Product from './Routes/productRoute.js'
import Order from './Routes/orderRoute.js'
import Review from './Routes/reviewRoute.js'
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cartRoutes from "./Routes/cart.js"
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS
app.use(helmet()); // Set security HTTP headers
app.use(morgan('dev')); // Log HTTP requests to the console in 'dev' format
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser());
dotenv.config()

app.use('/uploads', express.static('./uploads'));
app.use('/api/admin', Admin)
app.use('/api/client', Client)
app.use('/api/category', Category)
app.use('/api/product', Product)
app.use('/api/order', Order)
app.use('/api/review', Review)
app.use(globalErrorHandler);
app.use('/cart', cartRoutes);


connectDB(process.env.MONGO_URI).then(() => {
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
