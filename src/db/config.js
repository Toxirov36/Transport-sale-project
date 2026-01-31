import {connect} from "mongoose";
import dotenv from 'dotenv';
import logger from "../utils/logger.js";

dotenv.config();

export async function connectDB() {
    try {
        const connection = await connect(process.env.MONGO_URL)
        console.log("✅ Database connected")
    } catch (error) {
        console.log('❌ DB xatosi', error.message);
        logger.error(error.message)
        throw error
    }
}  