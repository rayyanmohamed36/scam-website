const express = require('express');
const router = express.Router();

// ─── POST /api/contact ────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // In production, integrate with EmailJS, SendGrid, or Nodemailer
    // For now, log and acknowledge
    console.log('Contact form submission:', { name, email, message });

    res.json({ message: 'Message received! We will get back to you soon.' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
