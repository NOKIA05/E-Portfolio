from flask import Flask
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()
db = SQLAlchemy()
limiter = Limiter(key_func=get_remote_address)

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

    CORS(app, origins=[os.getenv('FRONTEND_URL' , 'http://localhost:5173')])
    db.init_app(app)
    limiter.init_app(app)

    from app.routes.projects import projects_bp
    app.register_blueprint(projects_bp)
    from app.routes.blog import blog_bp
    app.register_blueprint(blog_bp)
    from app.routes.contact import contact_bp
    app.register_blueprint(contact_bp)
    from app.routes.resume import resume_bp
    app.register_blueprint(resume_bp)

    with app.app_context():
        from app.models.Project import Project
        from app.models.BlogPost import BlogPost
        db.create_all()

    return app