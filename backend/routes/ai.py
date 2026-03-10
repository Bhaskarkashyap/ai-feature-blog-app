from flask import Blueprint, request, jsonify
from services.gemini_service import GeminiService

ai_bp = Blueprint("ai", __name__)
gemini_service = None


def get_gemini_service():
    global gemini_service
    if gemini_service is None:
        gemini_service = GeminiService()
    return gemini_service


@ai_bp.route("/generate-title", methods=["POST"])
def generate_title():
    """Generate a blog post title based on topic"""
    data = request.get_json()

    if not data or not data.get("topic"):
        return jsonify({"error": "Topic is required"}), 400

    try:
        service = get_gemini_service()
        title = service.generate_title(data["topic"])
        return jsonify({"title": title}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to generate title: {str(e)}"}), 500


@ai_bp.route("/improve-content", methods=["POST"])
def improve_content():
    """Get improvement suggestions for blog post content"""
    data = request.get_json()

    if not data or not data.get("content"):
        return jsonify({"error": "Content is required"}), 400

    try:
        service = get_gemini_service()
        suggestions = service.improve_content(data["content"])
        return jsonify({"suggestions": suggestions}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to generate suggestions: {str(e)}"}), 500


@ai_bp.route("/generate-summary", methods=["POST"])
def generate_summary():
    """Generate a summary of blog post content"""
    data = request.get_json()

    if not data or not data.get("content"):
        return jsonify({"error": "Content is required"}), 400

    try:
        service = get_gemini_service()
        summary = service.generate_summary(data["content"])
        return jsonify({"summary": summary}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to generate summary: {str(e)}"}), 500


@ai_bp.route("/seo-recommendations", methods=["POST"])
def seo_recommendations():
    """Get SEO recommendations for blog post"""
    data = request.get_json()

    if not data or not data.get("title") or not data.get("content"):
        return jsonify({"error": "Title and content are required"}), 400

    try:
        service = get_gemini_service()
        recommendations = service.generate_seo_recommendations(
            data["title"], data["content"]
        )
        return jsonify(recommendations), 200
    except Exception as e:
        return jsonify({"error": f"Failed to generate recommendations: {str(e)}"}), 500


@ai_bp.route("/post-ideas", methods=["POST"])
def post_ideas():
    """Generate related blog post ideas based on a topic"""
    data = request.get_json()

    if not data or not data.get("topic"):
        return jsonify({"error": "Topic is required"}), 400

    count = data.get("count", 5)

    try:
        service = get_gemini_service()
        ideas = service.generate_post_ideas(data["topic"], count)
        return jsonify({"ideas": ideas}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to generate ideas: {str(e)}"}), 500
