import { connectDb } from "./database/dbConnect.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server is listening at port and db is connected")
    })
  })
  .catch((error) => {
    console.log("Error in connection", error);
  });
