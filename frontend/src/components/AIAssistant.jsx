import React, { useState } from 'react';
import { Sparkles, Loader, ChevronDown, ChevronUp } from 'lucide-react';
import { aiAPI } from '../services/api';

function AIAssistant({ title, content, onTitleChange, onContentChange }) {
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleGenerateTitle = async () => {
    if (!content.trim()) {
      setError('Please write some content first');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      const response = await aiAPI.generateTitle(content.substring(0, 500));
      setResult(response.data.title);
      setActiveTab('title');
    } catch (err) {
      setError('Failed to generate title');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImproveContent = async () => {
    if (!content.trim()) {
      setError('Please write some content first');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      const response = await aiAPI.improveContent(content);
      setResult(response.data.suggestions);
      setActiveTab('improve');
    } catch (err) {
      setError('Failed to generate suggestions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!content.trim()) {
      setError('Please write some content first');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      const response = await aiAPI.generateSummary(content);
      setResult(response.data.summary);
      setActiveTab('summary');
    } catch (err) {
      setError('Failed to generate summary');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSEORecommendations = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Please write title and content first');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      const response = await aiAPI.getSEORecommendations(title, content);
      setResult(response.data.recommendations);
      setActiveTab('seo');
    } catch (err) {
      setError('Failed to generate SEO recommendations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostIdeas = async () => {
    if (!title.trim()) {
      setError('Please write a title first');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      const response = await aiAPI.generatePostIdeas(title);
      setResult(response.data.ideas.join('\n'));
      setActiveTab('ideas');
    } catch (err) {
      setError('Failed to generate post ideas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyTitle = () => {
    onTitleChange({ target: { value: result } });
    setActiveTab(null);
  };

  const applySummary = () => {
    setActiveTab(null);
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200 mb-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between font-semibold text-lg text-purple-900 hover:bg-purple-100 rounded-t-lg transition-colors"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={24} className="text-yellow-500" />
          <span>AI Writing Assistant</span>
        </div>
        {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>

      {expanded && (
        <div className="px-6 py-6 border-t-2 border-purple-200 space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <button
              onClick={handleGenerateTitle}
              disabled={loading}
              className="btn btn-primary text-sm disabled:opacity-50"
            >
              {loading ? <Loader size={16} className="loading-spinner" /> : '✨'} Generate Title
            </button>
            <button
              onClick={handleGenerateSummary}
              disabled={loading}
              className="btn btn-primary text-sm disabled:opacity-50"
            >
              {loading ? <Loader size={16} className="loading-spinner" /> : '📝'} Summary
            </button>
            <button
              onClick={handleImproveContent}
              disabled={loading}
              className="btn btn-primary text-sm disabled:opacity-50"
            >
              {loading ? <Loader size={16} className="loading-spinner" /> : '🎯'} Improve
            </button>
            <button
              onClick={handleSEORecommendations}
              disabled={loading}
              className="btn btn-primary text-sm disabled:opacity-50"
            >
              {loading ? <Loader size={16} className="loading-spinner" /> : '🔍'} SEO
            </button>
            <button
              onClick={handlePostIdeas}
              disabled={loading}
              className="btn btn-primary text-sm disabled:opacity-50"
            >
              {loading ? <Loader size={16} className="loading-spinner" /> : '💡'} Ideas
            </button>
          </div>

          {result && (
            <div className="mt-4 bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-900">Result:</h4>
                {activeTab === 'title' && (
                  <button onClick={applyTitle} className="btn btn-primary text-sm">
                    Use This Title
                  </button>
                )}
              </div>
              <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 whitespace-pre-wrap max-h-48 overflow-y-auto">
                {result}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AIAssistant;
