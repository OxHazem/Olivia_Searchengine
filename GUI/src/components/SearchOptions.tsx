import React from 'react';
import { Search, Filter, Sliders } from 'lucide-react';

interface SearchOptionsProps {
  searchMethod: string;
  onSearchMethodChange: (method: string) => void;
  onFilterChange: (filters: any) => void;
}

const SearchOptions: React.FC<SearchOptionsProps> = ({
  searchMethod,
  onSearchMethodChange,
  onFilterChange,
}) => {
  const searchMethods = [
    { id: 'inverted', name: 'Inverted Index' },
    { id: 'boolean', name: 'Boolean Matrix' },
    { id: 'bm25', name: 'BM25' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Search size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Search Method:</span>
          </div>
          <select
            value={searchMethod}
            onChange={(e) => onSearchMethodChange(e.target.value)}
            className="text-sm border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700"
          >
            {searchMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onFilterChange({ sortBy: 'relevance' })}
              className="text-sm px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Relevance
            </button>
            <button
              onClick={() => onFilterChange({ sortBy: 'date' })}
              className="text-sm px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Date
            </button>
          </div>
        </div>

        <button
          onClick={() => onFilterChange({ showAdvanced: true })}
          className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700"
        >
          <Sliders size={16} />
          <span>Advanced</span>
        </button>
      </div>
    </div>
  );
};

export default SearchOptions; 