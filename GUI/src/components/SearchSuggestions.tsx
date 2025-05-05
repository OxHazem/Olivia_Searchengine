import React from 'react';
import { TrendingUp, Clock, Sparkles } from 'lucide-react';

interface SearchSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
  recentSearches: string[];
  trendingTopics: string[];
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  onSuggestionClick,
  recentSearches,
  trendingTopics,
}) => {
  return (
    <div className="absolute top-full left-0 right-0 mt-2 glass-effect rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
      <div className="p-6 space-y-6">
        {/* Recent Searches */}
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Clock size={16} />
            <span className="font-medium">Recent Searches</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(search)}
                className="text-left px-4 py-2 hover:bg-white/50 rounded-lg text-gray-700 transition-colors duration-150 flex items-center gap-2 group hover-lift"
              >
                <span className="w-5 h-5 flex items-center justify-center text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
                  {index + 1}
                </span>
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Trending Topics */}
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <TrendingUp size={16} />
            <span className="font-medium">Trending Topics</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {trendingTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(topic)}
                className="text-left px-4 py-2 hover:bg-white/50 rounded-lg text-gray-700 transition-colors duration-150 flex items-center gap-2 group hover-lift"
              >
                <Sparkles size={14} className="text-yellow-500" />
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions; 