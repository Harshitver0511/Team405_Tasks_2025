const mongoose=require("mongoose");
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MONGODB");
    } catch (error) {
        console.error("Error connecting to MongoDB",error);
        process.exit(1);
    }
}

module.exports=connectDB;