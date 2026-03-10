import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { postsAPI } from '../services/api';

function SearchBar({ onSearch, onTagFilter }) {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getTags();
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  const handleTagFilter = (e) => {
    const value = e.target.value;
    setSelectedTag(value);
    onTagFilter(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={handleSearch}
              className="input pl-10"
            />
          </div>
        </div>
        <div className="md:w-48">
          <div className="relative">
            <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
            <select
              value={selectedTag}
              onChange={handleTagFilter}
              className="input pl-10"
              disabled={loading}
            >
              <option value="">All Tags</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
