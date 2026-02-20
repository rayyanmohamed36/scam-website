const express = require('express');
const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const Story = require('../models/Story');
const Company = require('../models/Company');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// ─── Sanitize helper ──────────────────────────────────────────
const clean = (dirty) =>
  sanitizeHtml(dirty, {
    allowedTags: [],
    allowedAttributes: {},
  });

// ─── POST /api/share-story  (protected) ───────────────────────
router.post(
  '/',
  verifyToken,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('companyName').trim().notEmpty().withMessage('Company name is required'),
    body('category').optional().isIn([
      'Phishing', 'Crypto', 'Retail', 'Employment',
      'Romance', 'Tech Support', 'Investment', 'Other',
    ]),
    body('date').optional().isISO8601(),
  ],
  async (req, res) => {
    try {
      // Validate
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, content, companyName, category, date } = req.body;

      // Sanitize inputs
      const safeTitle = clean(title);
      const safeContent = clean(content);
      const safeCompanyName = clean(companyName);

      // ── Company upsert logic ──
      let company = await Company.findOne({
        name: { $regex: new RegExp(`^${safeCompanyName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
      });

      if (!company) {
        company = await Company.create({
          name: safeCompanyName,
          storyCount: 0,
          linkedStories: [],
        });
      }

      // ── Create story ──
      const story = await Story.create({
        title: safeTitle,
        content: safeContent,
        companyId: company._id,
        userId: req.user.uid,
        userName: req.user.name || req.user.email || 'Anonymous',
        category: category || 'Other',
        date: date || Date.now(),
      });

      // ── Update company ──
      company.storyCount += 1;
      company.linkedStories.push(story._id);
      await company.save();

      res.status(201).json({ message: 'Story shared successfully', story, company });
    } catch (error) {
      console.error('Share story error:', error);
      res.status(500).json({ error: 'Server error while sharing story' });
    }
  }
);

// ─── GET /api/share-story  (public — list stories) ───────────
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;

    const stories = await Story.find(filter)
      .populate('companyId', 'name storyCount')
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Story.countDocuments(filter);

    res.json({ stories, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Fetch stories error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
