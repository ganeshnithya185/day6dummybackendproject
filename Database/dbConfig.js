import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoURL = process.env.MONGODBCONNECTIONSTRING;
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(mongoURL);
   
    return connection;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
