export default function StoryCard({ story }) {
  const companyName = story.companyId?.name || 'Unknown Company';
  const date = new Date(story.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const categoryColors = {
    Phishing: 'bg-red-100 text-red-700',
    Crypto: 'bg-yellow-100 text-yellow-700',
    Retail: 'bg-blue-100 text-blue-700',
    Employment: 'bg-green-100 text-green-700',
    Romance: 'bg-pink-100 text-pink-700',
    'Tech Support': 'bg-purple-100 text-purple-700',
    Investment: 'bg-orange-100 text-orange-700',
    Other: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[story.category] || categoryColors.Other}`}>
          {story.category}
        </span>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{story.title}</h3>
      <p className="text-sm text-primary-600 font-medium mb-2">🏢 {companyName}</p>
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
        {story.content}
      </p>
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs text-gray-400">
        <span>Shared by {story.userName || 'Anonymous'}</span>
      </div>
    </div>
  );
}
