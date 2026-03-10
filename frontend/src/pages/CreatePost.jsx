import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RichEditor from '../components/RichEditor';
import AIAssistant from '../components/AIAssistant';
import { postsAPI } from '../services/api';
import { Loader, AlertCircle } from 'lucide-react';

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const tagList = tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      await postsAPI.create({
        title,
        content,
        author_name: authorName || 'Anonymous',
        summary,
        tags: tagList,
      });

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Create New Post</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter an engaging title..."
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Your name (optional)"
                className="input"
              />
            </div>

            <RichEditor
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here... (Markdown supported)"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Summary (optional)
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief summary of your post..."
                className="input h-20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. technology, ai, blog"
                className="input"
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {loading && <Loader size={20} className="loading-spinner" />}
                {loading ? 'Publishing...' : 'Publish Post'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1">
          <AIAssistant
            title={title}
            content={content}
            onTitleChange={(e) => setTitle(e.target.value)}
            onContentChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </main>
  );
}

export default CreatePost;
