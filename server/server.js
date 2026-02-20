require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

const app = express();

// ── Global Middleware ──
app.use(helmet());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      process.env.CLIENT_URL,
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '1mb' }));

// ── Ensure DB is connected before handling requests ──
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// ── Routes ──
app.use('/api/share-story', require('./routes/stories'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/contact', require('./routes/contact'));

// ── Health check ──
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

// ── Debug route (remove after fixing) ──
app.get('/api/debug', async (_, res) => {
  try {
    const mongoose = require('mongoose');
    const state = mongoose.connection.readyState;
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const stateMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
    
    const Story = require('./models/Story');
    const count = await Story.countDocuments();
    
    res.json({
      dbState: stateMap[state] || state,
      storyCount: count,
      envCheck: {
        hasMongo: !!process.env.MONGO_URI,
        hasFirebaseProject: !!process.env.FIREBASE_PROJECT_ID,
        hasFirebaseEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
        hasFirebaseKey: !!process.env.FIREBASE_PRIVATE_KEY,
        clientUrl: process.env.CLIENT_URL || 'NOT SET',
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

// ── Global error handler ──
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ── Local dev server (ignored on Vercel) ──
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ── Export for Vercel Serverless ──
module.exports = app;
