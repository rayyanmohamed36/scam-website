import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || '/api';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      doSearch(q);
    }
  }, []);

  const doSearch = async (q) => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(true);
    setSelectedCompany(null);
    try {
      const res = await axios.get(`${API}/companies/search`, { params: { q } });
      setResults(res.data.companies);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
    doSearch(query);
  };

  const viewCompany = async (id) => {
    try {
      const res = await axios.get(`${API}/companies/${id}`);
      setSelectedCompany(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getScamLevel = (count) => {
    if (count >= 10) return { label: 'High Risk', color: 'text-red-600 bg-red-50 border-red-200' };
    if (count >= 5) return { label: 'Moderate Risk', color: 'text-orange-600 bg-orange-50 border-orange-200' };
    if (count >= 1) return { label: 'Low Risk', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' };
    return { label: 'No Reports', color: 'text-green-600 bg-green-50 border-green-200' };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Search a Business</h1>
      <p className="text-gray-500 mb-8">
        Look up any company to check if it's been reported for scams. Fuzzy search included — even typos will work!
      </p>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <input
            type="text"
            placeholder="Enter company name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-5 py-4 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 px-8 py-4 text-white font-semibold transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-500">Searching...</p>
        </div>
      ) : searched && results.length === 0 ? (
        <div className="text-center py-12 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-green-700 text-lg font-medium">✅ No reports found for "{searchParams.get('q')}"</p>
          <p className="text-green-600 text-sm mt-1">This doesn't guarantee safety — always stay cautious.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Company List */}
          <div className="space-y-4">
            {results.map((company) => {
              const scam = getScamLevel(company.storyCount);
              return (
                <button
                  key={company._id}
                  onClick={() => viewCompany(company._id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all hover:shadow-md ${
                    selectedCompany?._id === company._id
                      ? 'border-primary-400 bg-primary-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 text-lg">{company.name}</h3>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${scam.color}`}>
                      {scam.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {company.storyCount} report{company.storyCount !== 1 ? 's' : ''}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Company Details */}
          {selectedCompany && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{selectedCompany.name}</h2>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-red-600">{selectedCompany.storyCount}</span>
                <span className="text-gray-500">Scam Reports</span>
              </div>

              <h3 className="font-semibold text-gray-700 mb-3">Linked Stories</h3>
              {selectedCompany.linkedStories?.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedCompany.linkedStories.map((story) => (
                    <div key={story._id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-800 text-sm">{story.title}</h4>
                        <span className="text-xs text-gray-400">
                          {new Date(story.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{story.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No stories linked yet.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
