import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express()

app.use(cookieParser())
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    optionsSuccessStatus : 200
}))
app.use(express.json())

// routes
import userRouter from './routes/user.routes.js'
import todoRouter from './routes/todo.routes.js'

app.use('/api/users', userRouter)
app.use('/api/todo', todoRouter)

export default app