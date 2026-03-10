# Quick Start Guide - AI Content Blog Platform

Follow these steps to get your AI Content Blog Platform running locally.

## Prerequisites

Before you start, make sure you have:
- Python 3.8 or higher installed
- Node.js 16 or higher installed
- A Google Gemini API key (free at https://makersuite.google.com)

## Step 1: Backend Setup (Terminal 1)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your API key
echo "GEMINI_API_KEY=your_api_key_here" > .env
echo "FLASK_ENV=development" >> .env
echo "FLASK_APP=app.py" >> .env

# Start Flask server
python app.py
```

You should see:
```
 * Serving Flask app 'app'
 * Running on http://127.0.0.1:5000
```

## Step 2: Frontend Setup (Terminal 2)

```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

The app will automatically open at `http://localhost:3000`

## Step 3: Start Creating!

1. Click "Write Post" to create your first blog post
2. Use the AI Assistant panel to:
   - Generate engaging titles
   - Improve your content
   - Create summaries
   - Get SEO recommendations
   - Find post ideas
3. Publish your post and see it on the home page

## Available Commands

### Backend
```bash
cd backend
python app.py                 # Start server
python -m pip install -r requirements.txt  # Install deps
```

### Frontend
```bash
cd frontend
npm start                      # Start dev server
npm run build                 # Build for production
npm test                      # Run tests
```

## API Testing

Once both servers are running, you can test the API:

```bash
# Get all posts
curl http://localhost:5000/api/posts

# Generate a title (requires content)
curl -X POST http://localhost:5000/api/ai/generate-title \
  -H "Content-Type: application/json" \
  -d '{"topic":"artificial intelligence and machine learning"}'

# Check health
curl http://localhost:5000/api/health
```

## Troubleshooting

### Backend won't start
- Ensure port 5000 is not in use
- Check Python version: `python --version` (should be 3.8+)
- Verify virtual environment is activated

### Frontend won't start
- Ensure port 3000 is not in use
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (should be 16+)

### AI features not working
- Verify GEMINI_API_KEY in backend/.env is correct
- Check your Gemini API quota at https://makersuite.google.com
- Ensure content is at least 10 characters

### Connection refused error
- Make sure backend is running on port 5000
- Check frontend proxy setting in frontend/package.json

## Project Structure

```
ai-blog-platform/
├── backend/                   # Python Flask API
│   ├── app.py                # Main app
│   ├── models.py             # Database models
│   ├── config.py             # Configuration
│   ├── requirements.txt       # Dependencies
│   ├── .env                  # API keys (create this)
│   ├── routes/               # API endpoints
│   │   ├── posts.py
│   │   └── ai.py
│   └── services/             # Business logic
│       └── gemini_service.py
│
└── frontend/                  # React app
    ├── public/
    ├── src/
    │   ├── pages/            # Page components
    │   ├── components/       # UI components
    │   └── services/         # API client
    └── package.json
```

## Next Steps

1. **Customize styles**: Edit `frontend/src/index.css`
2. **Modify colors**: Update `frontend/tailwind.config.js`
3. **Add features**: Follow the existing patterns for new AI features
4. **Deploy**: Use Vercel (frontend) and Heroku/Railway (backend)

## Support

Refer to README.md for complete documentation and API endpoints.
