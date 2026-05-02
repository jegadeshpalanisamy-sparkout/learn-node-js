import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        throw err;
    }
}
