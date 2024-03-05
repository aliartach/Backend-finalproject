import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

function connectDB(MONGO_URI) {
  return new Promise((resolve, reject) => {
    // Use mongoose to connect to the MongoDB database using the provided URI.
    mongoose
      .connect(MONGO_URI)
      .then(() => {
        console.log('Connected to MongoDB');
        resolve();
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB: ', error);
        reject(error);
      });
  });
}

export default connectDB;
