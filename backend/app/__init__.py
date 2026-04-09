from flask import Flask
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()  # Loads variables from .env — must run before any os.getenv() calls
db = SQLAlchemy()
limiter = Limiter(key_func=get_remote_address)  # Rate limits by IP address

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

    # CORS: only allows requests from the frontend URL (localhost in dev, Vercel URL in prod)
    CORS(app, origins=[os.getenv('FRONTEND_URL', 'http://localhost:5173')])
    db.init_app(app)
    limiter.init_app(app)

    # Blueprints are imported here (inside create_app) to avoid circular imports
    from app.routes.projects import projects_bp
    app.register_blueprint(projects_bp)
    from app.routes.blog import blog_bp
    app.register_blueprint(blog_bp)
    from app.routes.contact import contact_bp
    app.register_blueprint(contact_bp)
    from app.routes.resume import resume_bp
    app.register_blueprint(resume_bp)

    # Creates all database tables if they don't exist yet
    with app.app_context():
        from app.models.Project import Project
        from app.models.BlogPost import BlogPost
        db.create_all()

    return app
