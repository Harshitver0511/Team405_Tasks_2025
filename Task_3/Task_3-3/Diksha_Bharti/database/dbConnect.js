import mongoose from "mongoose";

export async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        const connectionInstance = mongoose.connection

        connectionInstance.on("connected",() => {
            console.log("Connected to database")
        })

        connectionInstance.on("error", () => {
            console.log("Error in connection")
        })
    } 
    catch (error) {
        console.log("Error in connecting to database", error);
        throw error
    }
}