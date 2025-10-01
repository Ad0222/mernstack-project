const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

if (!process.env.MONGO_URI || !process.env.PORT) {
  console.error("❌ Missing .env variables");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
