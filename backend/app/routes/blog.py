from flask import Blueprint, jsonify
from app import db
from app.models.BlogPost import BlogPost

blog_bp = Blueprint('blog', __name__)

@blog_bp.route('/api/blog', methods=['GET'])
def get_blog_posts():
    blog_posts = BlogPost.query.all()
    return jsonify([bp.to_dict() for bp in blog_posts])