const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Enhanced error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware with more detailed logging
app.use((req, res, next) => {
    console.log('📝 Request Details:');
    console.log('  URL:', req.url);
    console.log('  Method:', req.method);
    console.log('  Body:', req.body);
    console.log('  Headers:', req.headers);
    next();
});

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// MongoDB connection with retry logic
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        // Retry connection after 5 seconds
        setTimeout(connectDB, 5000);
    }
};

connectDB();

// Test route with health check
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🚀 Campus Connect backend is running successfully!',
        timestamp: new Date(),
        environment: process.env.NODE_ENV
    });
});

// Error handling middleware
app.use(errorHandler);

// Start server with enhanced logging
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`
✅ Server Status:
   - Running on: http://localhost:${PORT}
   - Environment: ${process.env.NODE_ENV || 'development'}
   - Timestamp: ${new Date().toISOString()}
    `);
});

// Handle server shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM. Performing graceful shutdown...');
    server.close(() => {
        mongoose.connection.close(false, () => {
            console.log('💤 Server and MongoDB connection closed');
            process.exit(0);
        });
    });
});