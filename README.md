# AI Content Blog Platform

A modern, full-stack blog platform featuring AI-powered writing assistance using Google Gemini API. Built with Flask (Python backend), React (frontend), and SQLite database.

## Features

- **Blog Post Management**: Create, edit, delete, and view blog posts with rich markdown support
- **AI Writing Assistant**: Get intelligent suggestions powered by Google Gemini:
  - Generate catchy blog titles
  - Improve content clarity and engagement
  - Generate summaries automatically
  - Get SEO recommendations
  - Discover related blog post ideas
- **Tagging & Filtering**: Organize posts with tags and filter content
- **Search Functionality**: Find posts by title or content
- **Responsive Design**: Beautiful UI built with Tailwind CSS
- **No Authentication Required**: Simple and straightforward for all users

## Tech Stack

### Backend
- **Framework**: Flask 3.0
- **Database**: SQLite with SQLAlchemy ORM
- **AI**: Google Generative AI (Gemini)
- **API**: RESTful with Flask-CORS

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP**: Axios
- **Markdown**: React Markdown
- **Icons**: Lucide React

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+ and npm/yarn
- Google Gemini API Key (get it from https://makersuite.google.com)

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**:
   ```bash
   cp .env .env.local
   ```
   Edit `.env.local` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

5. **Run the Flask server**:
   ```bash
   python app.py
   ```
   The backend will run at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory** (in a new terminal):
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   The frontend will open at `http://localhost:3000`

## API Endpoints

### Posts
- `GET /api/posts` - List posts (supports pagination, search, tag filtering)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `GET /api/posts/tags` - Get all tags

### AI Features
- `POST /api/ai/generate-title` - Generate blog title
- `POST /api/ai/improve-content` - Get content improvement suggestions
- `POST /api/ai/generate-summary` - Generate post summary
- `POST /api/ai/seo-recommendations` - Get SEO recommendations
- `POST /api/ai/post-ideas` - Generate related post ideas

## Project Structure

```
├── backend/
│   ├── app.py                 # Flask app entry point
│   ├── config.py              # Configuration settings
│   ├── models.py              # Database models
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # Environment variables
│   ├── routes/
│   │   ├── posts.py           # Post CRUD endpoints
│   │   └── ai.py              # AI feature endpoints
│   └── services/
│       └── gemini_service.py   # Gemini AI integration
│
└── frontend/
    ├── public/
    │   └── index.html         # HTML template
    ├── src/
    │   ├── App.jsx            # Main app component
    │   ├── index.js           # Entry point
    │   ├── index.css          # Global styles
    │   ├── pages/
    │   │   ├── Home.jsx       # Blog listing
    │   │   ├── CreatePost.jsx # Create post page
    │   │   ├── EditPost.jsx   # Edit post page
    │   │   └── ViewPost.jsx   # View single post
    │   ├── components/
    │   │   ├── Navbar.jsx     # Navigation
    │   │   ├── BlogCard.jsx   # Post card
    │   │   ├── SearchBar.jsx  # Search & filter
    │   │   ├── RichEditor.jsx # Markdown editor
    │   │   └── AIAssistant.jsx# AI helper
    │   └── services/
    │       └── api.js         # API client
    ├── package.json           # npm dependencies
    └── tailwind.config.js     # Tailwind configuration
```

## Database Schema

### Posts Table
- `id`: Integer (Primary Key)
- `title`: String (Required)
- `content`: Text (Required)
- `slug`: String (Unique)
- `author_name`: String
- `summary`: Text
- `created_at`: DateTime
- `updated_at`: DateTime

### Tags Table
- `id`: Integer (Primary Key)
- `name`: String (Unique)

### Post_Tags Table (Junction)
- `post_id`: Integer (Foreign Key)
- `tag_id`: Integer (Foreign Key)

## Usage Guide

### Creating a Blog Post
1. Click "Write Post" in the navigation
2. Fill in the post title and content
3. Use the AI Assistant panel to:
   - Generate a catchy title
   - Get content improvement suggestions
   - Create a summary automatically
4. Add tags for better organization
5. Click "Publish Post"

### Using AI Features
- **Generate Title**: Let AI create an engaging title based on your content
- **Improve Content**: Get specific suggestions to enhance clarity and readability
- **Generate Summary**: Automatically create a concise summary of your post
- **SEO Recommendations**: Optimize your post for search engines
- **Post Ideas**: Discover related topics for future posts

### Searching & Filtering
- Use the search bar to find posts by title or content
- Filter posts by tags using the dropdown menu
- Browse through paginated results

## Configuration

### Environment Variables

**Backend (.env file)**:
```
FLASK_ENV=development
FLASK_APP=app.py
GEMINI_API_KEY=your_api_key_here
```

**Frontend**:
- API Base URL is set to `http://localhost:5000/api` in `src/services/api.js`
- Update the proxy in `package.json` if needed for production

## Development

### Adding New AI Features
1. Add a new method in `backend/services/gemini_service.py`
2. Create a new route in `backend/routes/ai.py`
3. Add API call in `frontend/src/services/api.js`
4. Update `AIAssistant.jsx` component with the new button

### Styling
The project uses Tailwind CSS with custom components defined in `src/index.css`. Modify the color scheme in `tailwind.config.js`.

## Troubleshooting

### Backend Issues
- **Port already in use**: Change port in `app.py` or kill process on port 5000
- **GEMINI_API_KEY not set**: Make sure `.env` file has your API key
- **Database errors**: Delete `backend/blog.db` to reset the database

### Frontend Issues
- **API connection errors**: Ensure backend is running on port 5000
- **Styles not loading**: Run `npm install` to ensure Tailwind CSS is properly installed
- **Module not found**: Run `npm install` to reinstall dependencies

### AI Features Not Working
- Verify your Gemini API key is valid
- Check your API usage and quota limits
- Ensure content/title meets minimum length requirements

## Future Enhancements

- User authentication and multi-user support
- Comment system
- Social sharing integration
- Advanced analytics
- Post scheduling
- Multiple AI model support
- Dark mode
- Export to PDF


