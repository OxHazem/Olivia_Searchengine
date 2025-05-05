import React, { useState, useEffect } from 'react';
import { Search, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { getRelatedTerms } from '../utils/queryExpansion';
import { Document } from '../types';

interface RealTimeSuggestionsProps {
  query: string;
  onSuggestionClick: (suggestion: string) => void;
  recentSearches: string[];
  documents: Document[];
}

const RealTimeSuggestions: React.FC<RealTimeSuggestionsProps> = ({
  query,
  onSuggestionClick,
  recentSearches,
  documents,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const generateSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      
      try {
        const newSuggestions = new Set<string>();
        const queryLower = query.toLowerCase();
        
        // Get related terms
        const relatedTerms = getRelatedTerms(query);
        relatedTerms.forEach(term => newSuggestions.add(term));
        
        // Generate suggestions from document titles and text
        documents.forEach(doc => {
          const title = doc.title.toLowerCase();
          const text = doc.text.toLowerCase();
          
          // Check if document contains the query
          if (title.includes(queryLower) || text.includes(queryLower)) {
            // Add title as a suggestion
            newSuggestions.add(doc.title);
            
            // Extract relevant phrases from text
            const sentences = text.split(/[.!?]+/);
            sentences.forEach(sentence => {
              if (sentence.includes(queryLower)) {
                // Clean and trim the sentence
                const cleanSentence = sentence.trim().replace(/\s+/g, ' ');
                if (cleanSentence.length > 20 && cleanSentence.length < 100) {
                  newSuggestions.add(cleanSentence);
                }
              }
            });
          }
        });
        
        // Add common prefixes
        ['how to', 'what is', 'why', 'when', 'where', 'who'].forEach(prefix => {
          newSuggestions.add(`${prefix} ${query}`);
        });
        
        // Add common suffixes
        ['tutorial', 'guide', 'examples', 'definition', 'meaning'].forEach(suffix => {
          newSuggestions.add(`${query} ${suffix}`);
        });
        
        // Add recent searches that match the query
        recentSearches.forEach(search => {
          if (search.toLowerCase().includes(queryLower)) {
            newSuggestions.add(search);
          }
        });
        
        // Sort suggestions by relevance
        const sortedSuggestions = Array.from(newSuggestions)
          .sort((a, b) => {
            // Prioritize exact matches
            const aExact = a.toLowerCase() === queryLower;
            const bExact = b.toLowerCase() === queryLower;
            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;
            
            // Then prioritize starts with
            const aStarts = a.toLowerCase().startsWith(queryLower);
            const bStarts = b.toLowerCase().startsWith(queryLower);
            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            
            // Then prioritize contains
            const aContains = a.toLowerCase().includes(queryLower);
            const bContains = b.toLowerCase().includes(queryLower);
            if (aContains && !bContains) return -1;
            if (!aContains && bContains) return 1;
            
            return 0;
          })
          .slice(0, 8);
        
        setSuggestions(sortedSuggestions);
      } catch (error) {
        console.error('Error generating suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(generateSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, recentSearches, documents]);

  if (!query.trim() || suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 glass-effect rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Clock size={16} />
                  <span className="font-medium">Recent Searches</span>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {recentSearches
                    .filter(search => search.toLowerCase().includes(query.toLowerCase()))
                    .slice(0, 3)
                    .map((search, index) => (
                      <button
                        key={index}
                        onClick={() => onSuggestionClick(search)}
                        className="text-left px-3 py-2 hover:bg-white/50 rounded-lg text-gray-700 transition-colors duration-150 flex items-center gap-2 group hover-lift"
                      >
                        <span className="w-5 h-5 flex items-center justify-center text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
                          {index + 1}
                        </span>
                        {search}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Sparkles size={16} />
                <span className="font-medium">Suggestions</span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => onSuggestionClick(suggestion)}
                    className="text-left px-3 py-2 hover:bg-white/50 rounded-lg text-gray-700 transition-colors duration-150 flex items-center gap-2 group hover-lift"
                  >
                    <Search size={14} className="text-indigo-500" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeSuggestions; 