import React, { useState } from 'react';
import { FileText, Calendar, User, BookOpen, Star, Share2, Bookmark, ChevronDown } from 'lucide-react';
import { SearchResult } from '../types';

interface ResultCardProps {
  result: SearchResult;
  onShare: (result: SearchResult) => void;
  onBookmark: (result: SearchResult) => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onShare, onBookmark }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Action Buttons */}
      <div className={`absolute top-4 right-4 flex items-center space-x-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => onShare(result)}
          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
          title="Share"
        >
          <Share2 size={16} />
        </button>
        <button
          onClick={() => onBookmark(result)}
          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
          title="Bookmark"
        >
          <Bookmark size={16} />
        </button>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
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
          <p className={`text-gray-600 transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
            {result.text}
          </p>
          <div className="mt-3 text-sm text-gray-500">
            <span className="flex items-center">
              <User size={14} className="mr-1" />
              {result.bib}
            </span>
          </div>
        </div>
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 flex items-center text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
      >
        {isExpanded ? 'Show less' : 'Show more'}
        <ChevronDown
          size={16}
          className={`ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {result.text.split(/\s+/).slice(0, 3).map((word, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ResultCard; 