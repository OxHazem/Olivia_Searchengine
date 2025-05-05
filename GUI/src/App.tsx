import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Sparkles, Star, TrendingUp, Command, History, X, ArrowRight } from 'lucide-react';
import SearchResults from './components/SearchResults';
import SearchOptions from './components/SearchOptions';
import SearchSuggestions from './components/SearchSuggestions';
import ThemeSwitcher from './components/ThemeSwitcher';
import { performInvertedIndexSearch, performBooleanMatrixSearch, performBM25Search } from './utils/searchAlgorithms';
import { loadCranfieldData } from './utils/dataLoader';
import { Document, SearchResult, Particle } from './types';
import QueryExpansion from './components/QueryExpansion';
import RealTimeSuggestions from './components/RealTimeSuggestions';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showShortcut, setShowShortcut] = useState(false);
  const [searchMethod, setSearchMethod] = useState('inverted');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [filters, setFilters] = useState({ sortBy: 'relevance' });
  const [documents, setDocuments] = useState<Document[]>([]);
  const [theme, setTheme] = useState('light');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      const data = await loadCranfieldData();
      setDocuments(data);
      
      // Extract trending topics from documents
      const topics = new Set<string>();
      data.forEach(doc => {
        doc.text.toLowerCase().split(/\s+/).forEach(word => {
          if (word.length > 3) topics.add(word);
        });
      });
      setTrendingTopics(Array.from(topics).slice(0, 6));
    };
    loadData();
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark', 'purple');
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.05), 100);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }

      particlesRef.current = particles;
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(79, 70, 229, 0.1)';
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.1)';

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        particles.forEach((particle2, j) => {
          if (i === j) return;
          
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        });

        // Interact with mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * 0.02;
          particle.vy -= Math.sin(angle) * 0.02;
        }
      });

      animationFrameRef.current = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    createParticles();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }
      if (e.key === 'Escape' && isFocused) {
        setIsFocused(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFocused]);

  const handleSearch = async () => {
    if (!searchQuery.trim() || documents.length === 0) return;
    
    setIsLoading(true);
    
    try {
      // Add to recent searches
      setRecentSearches(prev => {
        const newSearches = [searchQuery, ...prev.filter(s => s !== searchQuery)].slice(0, 6);
        return newSearches;
      });

      // Implement your search logic here based on the selected method
      let results: SearchResult[] = [];
      
      switch (searchMethod) {
        case 'inverted':
          results = performInvertedIndexSearch(searchQuery, documents);
          break;
        case 'boolean':
          results = performBooleanMatrixSearch(searchQuery, documents);
          break;
        case 'bm25':
          results = performBM25Search(searchQuery, documents);
          break;
      }
      
      // Apply filters
      if (filters.sortBy === 'relevance') {
        results.sort((a, b) => b.score - a.score);
      } else if (filters.sortBy === 'date') {
        results.sort((a, b) => b.docId - a.docId);
      }
      
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = (result: SearchResult) => {
    // Implement share functionality
    console.log('Sharing result:', result);
  };

  const handleBookmark = (result: SearchResult) => {
    // Implement bookmark functionality
    console.log('Bookmarking result:', result);
  };

  return (
    <div className="min-h-screen theme-background flex flex-col items-center p-4 font-inter relative overflow-hidden">
      {/* Interactive Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 theme-gradient"
      />

      {/* Main Content */}
      <div className="w-full max-w-5xl z-10 space-y-8">
        {/* Title with animation */}
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3">
            <Sparkles size={48} className="text-indigo-500 animate-pulse" />
            <h1 className="font-playfair text-6xl font-bold theme-text mb-2 tracking-tight">
              OILIVIA
            </h1>
            <Sparkles size={48} className="text-indigo-500 animate-pulse" />
          </div>
          <p className="theme-text-secondary text-lg font-light">
            Advanced Document Search Engine
          </p>
        </div>

        {/* Search Container */}
        <div className="relative">
          <div className="flex flex-col md:flex-row gap-2 glass-effect rounded-2xl overflow-hidden shadow-2xl">
            {/* Search Input */}
            <div className="relative flex-grow group">
              <input
                id="search-input"
                type="text"
                placeholder="Search documents..."
                className="w-full px-8 py-6 text-lg bg-transparent border-0 focus:outline-none focus:ring-0 placeholder-gray-400 theme-text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  setIsFocused(true);
                  setShowShortcut(true);
                }}
                onBlur={() => {
                  setTimeout(() => setIsFocused(false), 200);
                  setShowShortcut(false);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {searchQuery && (
                  <button
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    onClick={() => setSearchQuery('')}
                  >
                    <X size={18} />
                  </button>
                )}
                {showShortcut && (
                  <span className="text-sm text-gray-400 border border-gray-200 rounded px-2 py-1">
                    <Command size={14} className="inline mr-1" />
                    K
                  </span>
                )}
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-8 py-6 search-button-gradient text-white hover:opacity-90 transition-opacity flex items-center justify-center"
            >
              <Search size={24} />
            </button>
          </div>

          {/* Real-time Suggestions */}
          {isFocused && (
            <RealTimeSuggestions
              query={searchQuery}
              onSuggestionClick={setSearchQuery}
              recentSearches={recentSearches}
              documents={documents}
            />
          )}

          {/* Query Expansion */}
          {searchQuery && !isFocused && (
            <QueryExpansion
              query={searchQuery}
              onQueryClick={setSearchQuery}
            />
          )}
        </div>

        {/* Search Options */}
        <SearchOptions
          searchMethod={searchMethod}
          onSearchMethodChange={setSearchMethod}
          onFilterChange={setFilters}
        />

        {/* Search Results */}
        <SearchResults
          results={searchResults}
          isLoading={isLoading}
          searchMethod={searchMethod}
        />
      </div>

      {/* Theme Switcher */}
      <ThemeSwitcher
        currentTheme={theme}
        onThemeChange={setTheme}
      />
    </div>
  );
}

export default App;