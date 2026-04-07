from flask import Blueprint, send_from_directory
import os

resume_bp = Blueprint('resume', __name__)

@resume_bp.route('/api/resume', methods=['GET'])
def download_resume():
    static_dir = os.path.join(os.path.dirname(__file__), '..', 'static')
    return send_from_directory(static_dir, 'resume.pdf', as_attachment=True)
