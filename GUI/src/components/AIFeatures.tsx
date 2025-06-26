import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, MessageSquare, Link, FileText, Mic, Image, Filter, Layers, Target, BarChart2, Search, BookOpen, Users, Zap, Star, Heart, Share2, Bookmark, Tag, Clock, TrendingUp, Globe, Lock, Unlock, Bell, Settings, Code, Database, Server, Cloud, Shield, Key, Eye, EyeOff } from 'lucide-react';
import { SearchResult } from '../types';

interface AIFeaturesProps {
  searchResults: SearchResult[];
  onQueryUpdate: (query: string) => void;
  onClusterUpdate: (clusters: any[]) => void;
}

interface Feature {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  isPremium?: boolean;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

const AIFeatures: React.FC<AIFeaturesProps> = ({
  searchResults,
  onQueryUpdate,
  onClusterUpdate
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [semanticQuery, setSemanticQuery] = useState('');
  const [clusterCount, setClusterCount] = useState(3);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [activeUsers, setActiveUsers] = useState<User[]>([
    { id: '1', name: 'Omar Darwish', avatar: '👨‍💻', role: 'Admin' },
    { id: '2', name: 'Omar Hazm', avatar: '👨‍🔬', role: 'Developer' }
  ]);
  const [showCollaborators, setShowCollaborators] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [securityLevel, setSecurityLevel] = useState('standard');

  const features: Feature[] = [
    {
      id: 'semantic',
      name: 'Semantic Search',
      icon: Brain,
      description: 'Find conceptually similar content using AI understanding'
    },
    {
      id: 'clustering',
      name: 'Smart Clustering',
      icon: Layers,
      description: 'Group similar results into meaningful clusters'
    },
    {
      id: 'recommendations',
      name: 'AI Recommendations',
      icon: Sparkles,
      description: 'Get personalized content suggestions'
    },
    {
      id: 'trends',
      name: 'Trend Analysis',
      icon: BarChart2,
      description: 'Analyze patterns and trends in results'
    },
    {
      id: 'collaboration',
      name: 'Real-time Collaboration',
      icon: Users,
      description: 'Work together with team members in real-time',
      isPremium: true
    },
    {
      id: 'security',
      name: 'Advanced Security',
      icon: Shield,
      description: 'Enterprise-grade security features',
      isPremium: true
    },
    {
      id: 'automation',
      name: 'Search Automation',
      icon: Zap,
      description: 'Automate repetitive search tasks',
      isPremium: true
    },
    {
      id: 'analytics',
      name: 'Deep Analytics',
      icon: Database,
      description: 'Advanced search analytics and insights',
      isPremium: true
    }
  ];

  // Simulated AI processing
  const simulateProcessing = async () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProcessingProgress(i);
    }
    
    setIsProcessing(false);
  };

  const handleSemanticSearch = async () => {
    await simulateProcessing();
    // Implement semantic search logic
    const results = searchResults.map(result => ({
      ...result,
      semanticScore: Math.random(),
      relatedConcepts: ['AI', 'Machine Learning', 'Data Science'].slice(0, Math.floor(Math.random() * 3) + 1)
    }));
    console.log('Semantic search results:', results);
  };

  const handleClustering = async () => {
    await simulateProcessing();
    const clusters = Array.from({ length: clusterCount }, (_, i) => ({
      id: i,
      name: `Cluster ${i + 1}`,
      items: searchResults.slice(i * Math.floor(searchResults.length / clusterCount), (i + 1) * Math.floor(searchResults.length / clusterCount)),
      theme: ['AI', 'Data', 'Research', 'Technology'][i % 4]
    }));
    onClusterUpdate(clusters);
  };

  const handleRecommendations = async () => {
    await simulateProcessing();
    setShowRecommendations(true);
  };

  const handleSecurityToggle = () => {
    setShowSecurity(!showSecurity);
    setSecurityLevel(prev => prev === 'standard' ? 'enhanced' : 'standard');
  };

  return (
    <div className="fixed top-4 right-4 z-40">
      {/* AI Features Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 flex items-center justify-center group"
        style={{ width: '56px', height: '56px' }}
      >
        <Brain className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
      </button>

      {/* AI Features Panel */}
      {isExpanded && (
        <div className="fixed top-20 right-4 w-96 bg-white rounded-xl shadow-2xl border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-purple-50 rounded-t-xl">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="font-medium text-purple-900">AI Features</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCollaborators(!showCollaborators)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Users className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Active Users */}
          {showCollaborators && (
            <div className="p-4 border-b bg-gray-50">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Active Collaborators</h4>
              <div className="space-y-2">
                {activeUsers.map(user => (
                  <div key={user.id} className="flex items-center gap-2">
                    <span className="text-xl">{user.avatar}</span>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features List */}
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  activeFeature === feature.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <div className="flex items-center gap-3">
                  <feature.icon className="w-5 h-5 text-purple-600" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{feature.name}</h4>
                      {feature.isPremium && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Content */}
          {activeFeature && (
            <div className="p-4 border-t">
              {isProcessing && (
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 transition-all duration-300"
                      style={{ width: `${processingProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Processing... {processingProgress}%</p>
                </div>
              )}

              {activeFeature === 'semantic' && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={semanticQuery}
                      onChange={(e) => setSemanticQuery(e.target.value)}
                      placeholder="Enter your semantic query..."
                      className="flex-1 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSemanticSearch}
                      className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {activeFeature === 'clustering' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Number of clusters:</label>
                    <input
                      type="number"
                      value={clusterCount}
                      onChange={(e) => setClusterCount(Number(e.target.value))}
                      min="2"
                      max="10"
                      className="w-20 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={handleClustering}
                    className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Generate Clusters
                  </button>
                </div>
              )}

              {activeFeature === 'recommendations' && (
                <div className="space-y-4">
                  <button
                    onClick={handleRecommendations}
                    className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Get Recommendations
                  </button>
                  {showRecommendations && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Recommended Topics</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <BookOpen className="w-4 h-4 text-purple-600" />
                          <span>Machine Learning Fundamentals</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <Target className="w-4 h-4 text-purple-600" />
                          <span>Deep Learning Applications</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <Filter className="w-4 h-4 text-purple-600" />
                          <span>Natural Language Processing</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeFeature === 'security' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Security Level</span>
                    <button
                      onClick={handleSecurityToggle}
                      className="flex items-center gap-2 text-sm text-purple-600"
                    >
                      {securityLevel === 'standard' ? (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Standard</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-4 h-4" />
                          <span>Enhanced</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Security Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-600">
                        <Shield className="w-4 h-4 text-purple-600" />
                        <span>End-to-end encryption</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-600">
                        <Key className="w-4 h-4 text-purple-600" />
                        <span>Two-factor authentication</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-600">
                        <Eye className="w-4 h-4 text-purple-600" />
                        <span>Activity monitoring</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeFeature === 'trends' && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Trend Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">AI & Machine Learning</span>
                        <span className="text-sm font-medium text-purple-600">↑ 45%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Data Science</span>
                        <span className="text-sm font-medium text-purple-600">↑ 32%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Big Data</span>
                        <span className="text-sm font-medium text-purple-600">↑ 28%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIFeatures; 