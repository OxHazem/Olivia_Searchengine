import React from 'react';
import { Settings, Palette, Layout, Font, Animation, Eye, Search, Star, Zap } from 'lucide-react';

interface AdvancedSettingsProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({ settings, onSettingsChange }) => {
  const updateSetting = (key: string, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="glass-effect p-6 rounded-xl space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Advanced Settings</h2>
      </div>

      {/* Layout Settings */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Layout className="w-4 h-4" />
          <h3 className="font-medium">Layout</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={settings.layout}
            onChange={(e) => updateSetting('layout', e.target.value)}
            className="glass-effect p-2 rounded-lg"
          >
            <option value="default">Default</option>
            <option value="compact">Compact</option>
            <option value="wide">Wide</option>
          </select>
          <select
            value={settings.sidebarPosition}
            onChange={(e) => updateSetting('sidebarPosition', e.target.value)}
            className="glass-effect p-2 rounded-lg"
          >
            <option value="right">Right Sidebar</option>
            <option value="left">Left Sidebar</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>
      </section>

      {/* Animation Settings */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Animation className="w-4 h-4" />
          <h3 className="font-medium">Animation</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={settings.animationSpeed}
            onChange={(e) => updateSetting('animationSpeed', e.target.value)}
            className="glass-effect p-2 rounded-lg"
          >
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
            <option value="fast">Fast</option>
          </select>
          <select
            value={settings.particleDensity}
            onChange={(e) => updateSetting('particleDensity', e.target.value)}
            className="glass-effect p-2 rounded-lg"
          >
            <option value="low">Low Density</option>
            <option value="medium">Medium Density</option>
            <option value="high">High Density</option>
          </select>
        </div>
      </section>

      {/* Typography Settings */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Font className="w-4 h-4" />
          <h3 className="font-medium">Typography</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={settings.fontFamily}
            onChange={(e) => updateSetting('fontFamily', e.target.value)}
            className="glass-effect p-2 rounded-lg"
          >
            <option value="inter">Inter</option>
            <option value="roboto">Roboto</option>
            <option value="poppins">Poppins</option>
          </select>
          <select
            value={settings.fontSize}
            onChange={(e) => updateSetting('fontSize', e.target.value)}
            className="glass-effect p-2 rounded-lg"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </section>

      {/* Color Settings */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          <h3 className="font-medium">Colors</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm">Primary</label>
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => updateSetting('primaryColor', e.target.value)}
              className="w-full h-8 rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm">Secondary</label>
            <input
              type="color"
              value={settings.secondaryColor}
              onChange={(e) => updateSetting('secondaryColor', e.target.value)}
              className="w-full h-8 rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm">Accent</label>
            <input
              type="color"
              value={settings.accentColor}
              onChange={(e) => updateSetting('accentColor', e.target.value)}
              className="w-full h-8 rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Accessibility Settings */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4" />
          <h3 className="font-medium">Accessibility</h3>
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => updateSetting('highContrast', e.target.checked)}
              className="rounded"
            />
            High Contrast Mode
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
              className="rounded"
            />
            Reduced Motion
          </label>
        </div>
      </section>

      {/* Search Experience Settings */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          <h3 className="font-medium">Search Experience</h3>
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.autoComplete}
              onChange={(e) => updateSetting('autoComplete', e.target.checked)}
              className="rounded"
            />
            Auto-complete
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.searchHistory}
              onChange={(e) => updateSetting('searchHistory', e.target.checked)}
              className="rounded"
            />
            Search History
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.searchSuggestions}
              onChange={(e) => updateSetting('searchSuggestions', e.target.checked)}
              className="rounded"
            />
            Search Suggestions
          </label>
        </div>
      </section>

      {/* Performance Settings */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4" />
          <h3 className="font-medium">Performance</h3>
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.lazyLoading}
              onChange={(e) => updateSetting('lazyLoading', e.target.checked)}
              className="rounded"
            />
            Lazy Loading
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.infiniteScroll}
              onChange={(e) => updateSetting('infiniteScroll', e.target.checked)}
              className="rounded"
            />
            Infinite Scroll
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.resultCaching}
              onChange={(e) => updateSetting('resultCaching', e.target.checked)}
              className="rounded"
            />
            Result Caching
          </label>
        </div>
      </section>
    </div>
  );
};

export default AdvancedSettings; 