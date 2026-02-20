import { useState, useEffect } from 'react';
import axios from 'axios';
import StoryCard from '../components/StoryCard';

const API = import.meta.env.VITE_API_URL || '/api';
const CATEGORIES = ['All', 'Phishing', 'Crypto', 'Retail', 'Employment', 'Romance', 'Tech Support', 'Investment', 'Other'];

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = { page, limit: 12 };
    if (category !== 'All') params.category = category;

    axios
      .get(`${API}/share-story`, { params })
      .then((res) => {
        setStories(res.data.stories);
        setTotalPages(res.data.pages);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [category, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Scam Stories</h1>
      <p className="text-gray-500 mb-8">
        Real reports from real people. Filter by category to find scams relevant to you.
      </p>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setPage(1); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === cat
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-500">Loading stories...</p>
        </div>
      ) : stories.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">No stories found for this category.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                ← Previous
              </button>
              <span className="text-sm text-gray-500">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
