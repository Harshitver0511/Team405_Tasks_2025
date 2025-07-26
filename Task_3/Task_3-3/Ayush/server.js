import { dataBaseConnection } from "./database/mdb.js";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import userRouter from './router/user-routes.js'
import todoRouter from './router/todo-route.js'

const app = express()

app.use(cookieParser())
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    optionsSuccessStatus : 200
}))
app.use(express.json())

app.use('/api/person', userRouter)
app.use('/api/todo', todoRouter)


dotenv.config({ path: "./.env" });

dataBaseConnection()
  .then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Network stablished")
    })
  })
  .catch((error) => {
    console.log("Error in connection", error);
  });