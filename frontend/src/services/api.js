import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Posts API
export const postsAPI = {
  getAll: (page = 1, search = '', tag = '') => 
    api.get('/posts', { params: { page, search, tag, per_page: 10 } }),
  
  getById: (id) => 
    api.get(`/posts/${id}`),
  
  create: (postData) => 
    api.post('/posts', postData),
  
  update: (id, postData) => 
    api.put(`/posts/${id}`, postData),
  
  delete: (id) => 
    api.delete(`/posts/${id}`),
  
  getTags: () => 
    api.get('/posts/tags'),
};

// AI API
export const aiAPI = {
  generateTitle: (topic) => 
    api.post('/ai/generate-title', { topic }),
  
  improveContent: (content) => 
    api.post('/ai/improve-content', { content }),
  
  generateSummary: (content) => 
    api.post('/ai/generate-summary', { content }),
  
  getSEORecommendations: (title, content) => 
    api.post('/ai/seo-recommendations', { title, content }),
  
  generatePostIdeas: (topic, count = 5) => 
    api.post('/ai/post-ideas', { topic, count }),
};

export default api;
