import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { connectToDb } from './config/connectToDb.js';
import userRoute from './routes/userRoute.js';
import todoRoute from './routes/todoRoute.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

connectToDb();

app.use('/',userRoute);
app.use('/todos',todoRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

