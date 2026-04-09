from flask import Blueprint, jsonify
from app import db
from app.models.BlogPost import BlogPost

blog_bp = Blueprint('blog', __name__)

# GET /api/blog — returns all blog posts from the database as JSON.
# Not connected to the frontend yet — ready for when you add the Blog page.
@blog_bp.route('/api/blog', methods=['GET'])
def get_blog_posts():
    blog_posts = BlogPost.query.all()
    return jsonify([bp.to_dict() for bp in blog_posts])
