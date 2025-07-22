const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const userRoutes=require("./routes/userRoutes");
const todoRoutes=require("./routes/todoRoutes");
const connectDB=require("./config/db")

dotenv.config();
const port=process.env.PORT;
const app=express();
app.use(express.json());
connectDB();

app.use("/api/users",userRoutes);
app.use("/api/todos",todoRoutes);

app.listen(port,()=>{
    console.log(`Server running on port http://localhost:${port}`)
})