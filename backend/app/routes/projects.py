from flask import Blueprint, jsonify
from app import db 
from app.models.Project import Project

projects_bp = Blueprint('projects', __name__)

@projects_bp.route('/api/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([p.to_dict() for p in projects])