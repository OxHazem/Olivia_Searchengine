import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { getRelatedTerms } from '../utils/queryExpansion';

interface QueryExpansionProps {
  query: string;
  onQueryClick: (query: string) => void;
}

const QueryExpansion: React.FC<QueryExpansionProps> = ({ query, onQueryClick }) => {
  const relatedTerms = getRelatedTerms(query);

  if (relatedTerms.length === 0) return null;

  return (
    <div className="mt-4 p-4 glass-effect rounded-lg">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <Sparkles size={16} />
        <span className="font-medium">Related Terms</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {relatedTerms.map((term, index) => (
          <button
            key={index}
            onClick={() => onQueryClick(term)}
            className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors flex items-center gap-1"
          >
            <Search size={14} />
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QueryExpansion; 