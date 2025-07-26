import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n Database Connected!! DB Host: ${connectionInstance.Connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error", error);
        process.exit(1); // to exit the ongoing process in case of error
    }
}

export default connectDB 