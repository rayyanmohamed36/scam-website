import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StoryCard from '../components/StoryCard';

const API = import.meta.env.VITE_API_URL || '/api';

export default function Home() {
  const [stories, setStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/share-story?limit=6`)
      .then((res) => setStories(res.data.stories))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Protect Yourself from Scams
          </h1>
          <p className="text-lg md:text-xl text-primary-200 mb-8 max-w-2xl mx-auto">
            Search for suspicious businesses, read scam stories from real people, and share your own experience to help others stay safe.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="flex bg-white rounded-xl shadow-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search a business name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 px-6 py-4 text-white font-semibold transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/share"
              className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Share Your Story
            </Link>
            <Link
              to="/red-flags"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Learn Red Flags
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-primary-700">{stories.length > 0 ? '100+' : '—'}</p>
              <p className="text-sm text-gray-500">Reports Filed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-700">24/7</p>
              <p className="text-sm text-gray-500">Community Watch</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-700">Free</p>
              <p className="text-sm text-gray-500">Always Free</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Stories */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Latest Scam Stories</h2>
          <Link
            to="/stories"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            View All →
          </Link>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500 text-lg">No stories yet. Be the first to share!</p>
            <Link
              to="/share"
              className="inline-block mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Share a Story
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
