const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

const { connectDB } = require('./config/database');
const notesRoutes = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Sachify Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      notes: '/api/notes',
      docs: 'Check README.md for API documentation'
    },
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Sachify Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Favicon endpoint (to prevent 404 errors)
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No content
});

// API routes
app.use('/api/notes', notesRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Connect to database and start server
const startServer = async () => {
  try {
    // Try to connect to PostgreSQL
    try {
      await connectDB();
      console.log('📦 PostgreSQL connected successfully');
    } catch (dbError) {
      console.log('⚠️  PostgreSQL not available, running in demo mode');
      console.log('💡 To use full features, check your DATABASE_URL environment variable');
      console.log('💡 Your current DATABASE_URL: ' + (process.env.DATABASE_URL || 'Not set'));
    }
    
    app.listen(PORT, () => {
      console.log(`🚀 Sachify Backend server running on port ${PORT}`);
      console.log(`📊 Health check available at http://localhost:${PORT}/health`);
      console.log(`🔗 API base URL: http://localhost:${PORT}/api`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      
            // Note: Sequelize connection status is handled differently
      console.log('💡 API endpoints are ready');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app; 