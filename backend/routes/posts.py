from flask import Blueprint, request, jsonify
from models import db, Post, Tag
import re

posts_bp = Blueprint('posts', __name__)

def slugify(text):
    """Convert text to URL-friendly slug"""
    text = re.sub(r'[^\w\s-]', '', text.lower())
    return re.sub(r'[-\s]+', '-', text)

@posts_bp.route('', methods=['GET'])
def get_posts():
    """Get all posts with optional search and filtering"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    search = request.args.get('search', '', type=str)
    tag_filter = request.args.get('tag', '', type=str)
    
    query = Post.query
    
    if search:
        query = query.filter(
            (Post.title.ilike(f'%{search}%')) | 
            (Post.content.ilike(f'%{search}%'))
        )
    
    if tag_filter:
        query = query.join(Post.tags).filter(Tag.name == tag_filter)
    
    paginated = query.order_by(Post.created_at.desc()).paginate(
        page=page, per_page=per_page
    )
    
    posts = [post.to_dict() for post in paginated.items]
    
    return jsonify({
        'posts': posts,
        'total': paginated.total,
        'pages': paginated.pages,
        'current_page': page
    }), 200

@posts_bp.route('/<int:post_id>', methods=['GET'])
def get_post(post_id):
    """Get a single post by ID"""
    post = Post.query.get(post_id)
    
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    
    return jsonify(post.to_dict()), 200

@posts_bp.route('', methods=['POST'])
def create_post():
    """Create a new blog post"""
    data = request.get_json()
    
    if not data or not data.get('title') or not data.get('content'):
        return jsonify({'error': 'Title and content are required'}), 400
    
    title = data.get('title')
    content = data.get('content')
    author_name = data.get('author_name', 'Anonymous')
    summary = data.get('summary', '')
    tag_names = data.get('tags', [])
    
    # Create slug from title
    slug = slugify(title)
    
    # Check if slug already exists
    existing = Post.query.filter_by(slug=slug).first()
    if existing:
        return jsonify({'error': 'A post with this title already exists'}), 400
    
    try:
        post = Post(
            title=title,
            content=content,
            slug=slug,
            author_name=author_name,
            summary=summary
        )
        
        # Add tags
        for tag_name in tag_names:
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.session.add(tag)
            post.tags.append(tag)
        
        db.session.add(post)
        db.session.commit()
        
        return jsonify(post.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@posts_bp.route('/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    """Update an existing blog post"""
    post = Post.query.get(post_id)
    
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    
    data = request.get_json()
    
    try:
        if 'title' in data:
            post.title = data['title']
            post.slug = slugify(data['title'])
        
        if 'content' in data:
            post.content = data['content']
        
        if 'author_name' in data:
            post.author_name = data['author_name']
        
        if 'summary' in data:
            post.summary = data['summary']
        
        if 'tags' in data:
            post.tags.clear()
            for tag_name in data['tags']:
                tag = Tag.query.filter_by(name=tag_name).first()
                if not tag:
                    tag = Tag(name=tag_name)
                    db.session.add(tag)
                post.tags.append(tag)
        
        db.session.commit()
        return jsonify(post.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@posts_bp.route('/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    """Delete a blog post"""
    post = Post.query.get(post_id)
    
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    
    try:
        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'Post deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@posts_bp.route('/tags', methods=['GET'])
def get_all_tags():
    """Get all available tags"""
    tags = Tag.query.all()
    return jsonify([tag.to_dict() for tag in tags]), 200
