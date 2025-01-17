const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { router: authRouter, verifyToken } = require('./routes/auth');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourusername.github.io'] 
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Auth routes (no token required)
app.use('/api/auth', authRouter);

// Protected routes (token required)
app.use('/api/entities', verifyToken, require('./routes/entities'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 