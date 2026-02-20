const express = require('express');
const Company = require('../models/Company');

const router = express.Router();

// ─── GET /api/companies/search?q=term ─────────────────────────
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length === 0) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Try Atlas Search first (fuzzy), fall back to regex
    let companies;
    try {
      companies = await Company.aggregate([
        {
          $search: {
            index: 'default',
            text: {
              query: q,
              path: 'name',
              fuzzy: {
                maxEdits: 2,
                prefixLength: 1,
              },
            },
          },
        },
        { $limit: 20 },
        {
          $project: {
            name: 1,
            storyCount: 1,
            averageRating: 1,
            linkedStories: 1,
            score: { $meta: 'searchScore' },
          },
        },
      ]);
    } catch {
      // Fallback: regex-based search if Atlas Search index not configured
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      companies = await Company.find({
        name: { $regex: escaped, $options: 'i' },
      }).limit(20);
    }

    res.json({ companies });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Server error during search' });
  }
});

// ─── GET /api/companies/:id ───────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate({
      path: 'linkedStories',
      options: { sort: { date: -1 } },
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
