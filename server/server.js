require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// ── Connect to MongoDB ──
connectDB();

const app = express();

// ── Global Middleware ──
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));

// ── Routes ──
app.use('/api/share-story', require('./routes/stories'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/contact', require('./routes/contact'));

// ── Health check ──
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

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
