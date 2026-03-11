require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const axios = require('axios'); // Added for auto-ping

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Vite default port
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Serve frontend in production
const path = require('path');
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}

// Database connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/onlinelearning';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      
      // Auto-ping logic for free hosting (Render/Railway)
      if (process.env.RENDER_EXTERNAL_URL) {
        setInterval(() => {
          axios.get(process.env.RENDER_EXTERNAL_URL)
            .then(() => console.log('Auto-ping successful'))
            .catch(err => console.error('Auto-ping failed:', err.message));
        }, 14 * 60 * 1000); // Ping every 14 minutes
      }
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
