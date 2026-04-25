const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/subscribe', require('./routes/subscriberRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Root route
app.get('/', (req, res) => res.send('Deshi Drip API is running. Visit /api/health for status.'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'Deshi Drip API running ⚡' }));

// Global error handler
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;
