import mongoose from "mongoose";


let isConnected: boolean = false;

export const connectDb = async () => {

  if (isConnected) return;
  try {
    await mongoose.connect('mongodb+srv://dipak:dipak123@cluster0.ysqeecm.mongodb.net/News');
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}
