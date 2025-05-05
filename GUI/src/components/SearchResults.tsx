import React from 'react';
import { FileText, Calendar, User, BookOpen } from 'lucide-react';
import { SearchResult } from '../types';

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  searchMethod: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, isLoading, searchMethod }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 text-center text-gray-500">
        <p className="text-lg">No results found. Try different search terms or filters.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>Found {results.length} results using {searchMethod}</span>
        <div className="flex items-center space-x-2">
          <span className="flex items-center">
            <FileText size={16} className="mr-1" />
            Documents
          </span>
        </div>
      </div>

      {results.map((result) => (
        <div
          key={result.docId}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {result.title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  Document #{result.docId}
                </span>
                <span className="flex items-center">
                  <BookOpen size={14} className="mr-1" />
                  Score: {result.score.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 line-clamp-3">
                {result.text.substring(0, 200)}...
              </p>
              <div className="mt-3 text-sm text-gray-500">
                <span className="flex items-center">
                  <User size={14} className="mr-1" />
                  {result.bib}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults; 