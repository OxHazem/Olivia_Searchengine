import React, { useState } from 'react';
import { Search, Filter, Sliders, Calendar, Tag, FileText, Star, History } from 'lucide-react';

interface AdvancedSearchProps {
  onSearch: (filters: any) => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    dateRange: {
      start: '',
      end: ''
    },
    documentTypes: [],
    tags: [],
    authors: [],
    minRelevance: 0,
    maxResults: 50,
    sortBy: 'relevance',
    searchOperators: {
      exactMatch: false,
      fuzzyMatch: false,
      wildcard: false
    },
    customFilters: {}
  });

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="glass-effect p-6 rounded-xl space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Advanced Search</h2>
      </div>

      {/* Date Range Filter */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <h3 className="font-medium">Date Range</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Start Date</label>
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, start: e.target.value })}
              className="glass-effect p-2 rounded-lg w-full"
            />
          </div>
          <div>
            <label className="text-sm">End Date</label>
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, end: e.target.value })}
              className="glass-effect p-2 rounded-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Document Types */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <h3 className="font-medium">Document Types</h3>
        </div>
        <div className="space-y-2">
          {['PDF', 'DOC', 'TXT', 'HTML', 'XML'].map(type => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.documentTypes.includes(type)}
                onChange={(e) => {
                  const newTypes = e.target.checked
                    ? [...filters.documentTypes, type]
                    : filters.documentTypes.filter(t => t !== type);
                  updateFilter('documentTypes', newTypes);
                }}
                className="rounded"
              />
              {type}
            </label>
          ))}
        </div>
      </section>

      {/* Tags */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4" />
          <h3 className="font-medium">Tags</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Important', 'Draft', 'Final', 'Review', 'Archived'].map(tag => (
            <button
              key={tag}
              onClick={() => {
                const newTags = filters.tags.includes(tag)
                  ? filters.tags.filter(t => t !== tag)
                  : [...filters.tags, tag];
                updateFilter('tags', newTags);
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.tags.includes(tag)
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Search Operators */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          <h3 className="font-medium">Search Operators</h3>
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.searchOperators.exactMatch}
              onChange={(e) => updateFilter('searchOperators', {
                ...filters.searchOperators,
                exactMatch: e.target.checked
              })}
              className="rounded"
            />
            Exact Match
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.searchOperators.fuzzyMatch}
              onChange={(e) => updateFilter('searchOperators', {
                ...filters.searchOperators,
                fuzzyMatch: e.target.checked
              })}
              className="rounded"
            />
            Fuzzy Match
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.searchOperators.wildcard}
              onChange={(e) => updateFilter('searchOperators', {
                ...filters.searchOperators,
                wildcard: e.target.checked
              })}
              className="rounded"
            />
            Wildcard Search
          </label>
        </div>
      </section>

      {/* Relevance and Results */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4" />
          <h3 className="font-medium">Relevance & Results</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm">Minimum Relevance Score</label>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.minRelevance}
              onChange={(e) => updateFilter('minRelevance', parseInt(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-500">{filters.minRelevance}%</span>
          </div>
          <div>
            <label className="text-sm">Maximum Results</label>
            <input
              type="number"
              min="1"
              max="100"
              value={filters.maxResults}
              onChange={(e) => updateFilter('maxResults', parseInt(e.target.value))}
              className="glass-effect p-2 rounded-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Sort Options */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4" />
          <h3 className="font-medium">Sort By</h3>
        </div>
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilter('sortBy', e.target.value)}
          className="glass-effect p-2 rounded-lg w-full"
        >
          <option value="relevance">Relevance</option>
          <option value="date">Date</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="popularity">Popularity</option>
        </select>
      </section>

      {/* Search Button */}
      <button
        onClick={() => onSearch(filters)}
        className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default AdvancedSearch; 