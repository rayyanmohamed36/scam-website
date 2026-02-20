const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      unique: true,
      trim: true,
      maxlength: [200, 'Company name cannot exceed 200 characters'],
    },
    storyCount: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    linkedStories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story',
      },
    ],
  },
  { timestamps: true }
);

// Atlas Search index should be created in MongoDB Atlas UI on the "name" field
// with fuzzy matching enabled. Index definition (create in Atlas):
// {
//   "mappings": {
//     "dynamic": false,
//     "fields": {
//       "name": {
//         "type": "string",
//         "analyzer": "lucene.standard",
//         "searchAnalyzer": "lucene.standard"
//       }
//     }
//   }
// }

companySchema.index({ name: 'text' }); // fallback text index

module.exports = mongoose.model('Company', companySchema);
