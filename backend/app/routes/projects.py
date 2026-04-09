from flask import Blueprint, jsonify
from app import db
from app.models.Project import Project

projects_bp = Blueprint('projects', __name__)

# GET /api/projects — returns all projects from the database as JSON
# To add a project: use psql and INSERT INTO projects (title, description) VALUES (...)
@projects_bp.route('/api/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([p.to_dict() for p in projects])
