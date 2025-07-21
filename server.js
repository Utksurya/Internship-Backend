const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/index');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default Root Route
app.get('/', (req, res) => {
  res.send('Backend is running...');
});

// Health Check Route (optional but useful)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

// API Routes
app.use('/api', routes);

const PORT = process.env.PORT || 5000;

// Database and Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("Mongo Error:", err));
