import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, PieChart, TrendingUp, Users, Clock, Search, Activity } from 'lucide-react';

interface AnalyticsDashboardProps {
  data: any;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('searches');

  const metrics = {
    searches: {
      title: 'Total Searches',
      value: '1,234',
      change: '+12.3%',
      icon: Search
    },
    users: {
      title: 'Active Users',
      value: '456',
      change: '+5.7%',
      icon: Users
    },
    avgTime: {
      title: 'Avg. Search Time',
      value: '2.3s',
      change: '-0.5s',
      icon: Clock
    },
    engagement: {
      title: 'Engagement Rate',
      value: '78%',
      change: '+3.2%',
      icon: Activity
    }
  };

  return (
    <div className="glass-effect p-6 rounded-xl space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="glass-effect p-2 rounded-lg"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(metrics).map(([key, metric]) => (
          <div
            key={key}
            className={`glass-effect p-4 rounded-xl cursor-pointer transition-all ${
              selectedMetric === key ? 'ring-2 ring-indigo-500' : ''
            }`}
            onClick={() => setSelectedMetric(key)}
          >
            <div className="flex items-center justify-between mb-2">
              <metric.icon className="w-5 h-5 text-indigo-500" />
              <span className={`text-sm ${
                metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {metric.change}
              </span>
            </div>
            <h3 className="text-sm text-gray-500">{metric.title}</h3>
            <p className="text-2xl font-semibold">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Search Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-effect p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-medium">Search Trends</h3>
          </div>
          <div className="h-64">
            {/* Add your chart component here */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Search Volume Chart
            </div>
          </div>
        </div>

        <div className="glass-effect p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5" />
            <h3 className="font-medium">User Behavior</h3>
          </div>
          <div className="h-64">
            {/* Add your chart component here */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              User Activity Chart
            </div>
          </div>
        </div>
      </div>

      {/* Search Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-effect p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5" />
            <h3 className="font-medium">Popular Searches</h3>
          </div>
          <div className="space-y-2">
            {['machine learning', 'artificial intelligence', 'data science'].map((term, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{term}</span>
                <span className="text-sm text-gray-500">{1000 - index * 100} searches</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-effect p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5" />
            <h3 className="font-medium">Peak Hours</h3>
          </div>
          <div className="h-48">
            {/* Add your chart component here */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Peak Hours Chart
            </div>
          </div>
        </div>

        <div className="glass-effect p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5" />
            <h3 className="font-medium">Performance Metrics</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Search Success Rate</span>
                <span className="text-sm">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Average Response Time</span>
                <span className="text-sm">0.8s</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">User Satisfaction</span>
                <span className="text-sm">4.5/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="flex justify-end">
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
          Export Report
        </button>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 