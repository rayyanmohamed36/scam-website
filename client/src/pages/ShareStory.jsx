import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || '/api';
const CATEGORIES = ['Phishing', 'Crypto', 'Retail', 'Employment', 'Romance', 'Tech Support', 'Investment', 'Other'];

export default function ShareStory() {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: '',
    title: '',
    content: '',
    category: 'Other',
    date: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const token = await getToken();
      await axios.post(
        `${API}/share-story`,
        {
          companyName: form.companyName,
          title: form.title,
          content: form.content,
          category: form.category,
          date: form.date,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/stories');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit story. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Share Your Scam Story</h1>
      <p className="text-gray-500 mb-8">
        Your report helps protect others. All stories are posted anonymously by default.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
            Company / Business Name *
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            required
            placeholder="e.g. SketchyCryptoExchange"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
          />
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Story Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            maxLength={150}
            placeholder="e.g. Lost $500 to a fake investment platform"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition bg-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            When did this happen?
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Your Story *
          </label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={6}
            maxLength={5000}
            placeholder="Describe what happened in detail. This helps others avoid similar scams..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition resize-y"
          />
          <p className="text-xs text-gray-400 mt-1">{form.content.length}/5000 characters</p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit Story'}
        </button>
      </form>
    </div>
  );
}
