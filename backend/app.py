from flask import Flask
from flask_cors import CORS
from config import config
from models import db

def create_app(config_name='development'):
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    
    # Initialize database
    db.init_app(app)
    
    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    # Register blueprints
    from routes.posts import posts_bp
    from routes.ai import ai_bp
    
    app.register_blueprint(posts_bp, url_prefix='/api/posts')
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
    
    # Simple health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health():
        return {'status': 'healthy'}, 200
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
