import mongoose from "mongoose";

export async function dataBaseConnection(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        const connectionInstance = mongoose.connection

        connectionInstance.on("connected",() => {
            console.log("Connected to mongodb successfully")
        })

        connectionInstance.on("error", () => {
            console.log("Error in mongodb connection")
        })
    } 
    catch (error) {
        console.log("Error in connecting to database", error);
        throw error
    }
}