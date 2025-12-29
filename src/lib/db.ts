import mongoose from "mongoose";
let isConnected: boolean  = false;

export const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect('mongodb+srv://dipak:<db_dipak123@cluster0.ysqeecm.mongodb.net/News');
        isConnected = true;
        console.log("MongoDB connected");       
    } catch (error) {
        console.log("MongoDB connection error:", error);
        
    }
}