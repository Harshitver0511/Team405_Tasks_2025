import express, { urlencoded } from "express"
import cors from "cors"
import { logger } from "./middlewares/logger.middleware.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16 kb"}))

app.use(express.urlencoded({extended: true, limit: "16 kb"}))

app.use(logger)
import userRouter from "./routes/user.route.js"
import noteRouter from "./routes/note.route.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/notes",noteRouter)

export {app}