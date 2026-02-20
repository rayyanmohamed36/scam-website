const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    content: {
      type: String,
      required: [true, 'Story content is required'],
      trim: true,
      maxlength: [5000, 'Content cannot exceed 5000 characters'],
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    userId: {
      type: String, // Firebase UID
      required: true,
    },
    userName: {
      type: String,
      default: 'Anonymous',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: String,
      enum: ['Phishing', 'Crypto', 'Retail', 'Employment', 'Romance', 'Tech Support', 'Investment', 'Other'],
      default: 'Other',
    },
  },
  { timestamps: true }
);

// Index for querying by company
storySchema.index({ companyId: 1 });
storySchema.index({ category: 1 });
storySchema.index({ date: -1 });

module.exports = mongoose.model('Story', storySchema);
