const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', authRoutes);
app.use('/api/todos', todoRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT, () => {
        console.log('Server running on port', process.env.PORT);
    });
}).catch(err => console.log(err));
