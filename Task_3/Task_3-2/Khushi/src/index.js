import { app } from "./app.js";
import connectDB from "./database/index.js"

connectDB()
.then(()=> {
    app.on("error",(error) => {
        console.log("Error: ",error)
        throw error
    })

    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`Server is starting at the ${process.env.PORT}`);
    })
})
.catch(
    (error) => {
        console.log("MongoDB connection failed!",error);
    }
)