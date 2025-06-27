import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Star, Share2, Bookmark, Clock, FileText, Link, Tag, Users, Eye, Heart } from 'lucide-react';
import { SearchResult } from '../types';

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  searchMethod: string;
  onResultSelect: (result: SearchResult) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
  searchMethod,
  onResultSelect
}) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleCardClick = (resultId: string) => {
    setExpandedCard(expandedCard === resultId ? null : resultId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No results found. Try adjusting your search query.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => {
        const resultId = result.docId.toString();
        return (
          <div
            key={resultId}
            className={`relative bg-white rounded-xl shadow-md transition-all duration-300 ${
              expandedCard === resultId ? 'ring-2 ring-purple-500' : ''
            }`}
            onMouseEnter={() => setHoveredCard(resultId)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Card Header */}
            <div
              className="p-4 cursor-pointer"
              onClick={() => handleCardClick(resultId)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {result.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FileText className="w-4 h-4" />
                    <span>Document ID: {resultId}</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4" />
                    <span>Score: {(result.score * 100).toFixed(1)}%</span>
                  </div>
                </div>
                <button
                  className={`p-2 rounded-full transition-transform duration-300 ${
                    expandedCard === resultId ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Expandable Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedCard === resultId ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-4 border-t">
                {/* Content Preview */}
                <div className="mb-4">
                  <p className="text-gray-600">{result.text}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 border-t pt-4">
                  <button
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onResultSelect(result);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600 transition-colors">
                    <Star className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600 transition-colors">
                    <Bookmark className="w-4 h-4" />
                    <span>Bookmark</span>
                  </button>
                </div>

                {/* Tags and Metadata */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <Tag className="w-3 h-3 mr-1" />
                    {searchMethod}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Users className="w-3 h-3 mr-1" />
                    {Math.floor(Math.random() * 100)} views
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Heart className="w-3 h-3 mr-1" />
                    {Math.floor(Math.random() * 50)} likes
                  </span>
                </div>
              </div>
            </div>

            {/* Hover Effect */}
            {hoveredCard === resultId && !expandedCard && (
              <div className="absolute inset-0 rounded-xl ring-1 ring-purple-200 pointer-events-none transition-opacity duration-300" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults; 