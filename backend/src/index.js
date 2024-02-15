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

const app = express();

app.use(cors()); // Enable CORS
app.use(helmet()); // Set security HTTP headers
app.use(morgan('dev')); // Log HTTP requests to the console in 'dev' format
app.use(express.json()); // Parse JSON request bodies
dotenv.config()

app.use('/api/admin', Admin)
app.use('/api/client', Client)
app.use('/api/category', Category)
app.use('api/product', Product)
app.use(globalErrorHandler);

connectDB(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
