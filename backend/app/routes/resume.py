from flask import Blueprint, send_from_directory
import os

resume_bp = Blueprint('resume', __name__)

# Points to backend/app/static/ — drop resume.pdf and resume-preview-1.png / resume-preview-2.png here
static_dir = os.path.join(os.path.dirname(__file__), '..', 'static')

# GET /api/resume — downloads the PDF. download_name sets what the file is called on the user's machine
@resume_bp.route('/api/resume', methods=['GET'])
def download_resume():
    return send_from_directory(static_dir, 'resume.pdf', as_attachment=True, download_name='Abd-alrhman_Odeh_resume.pdf')

# GET /api/resume/preview/1 and /2 — serves the PNG images displayed on the Resume page
@resume_bp.route('/api/resume/preview/1', methods=['GET'])
def preview_resume_1():
    return send_from_directory(static_dir, 'resume-preview-1.png')

@resume_bp.route('/api/resume/preview/2', methods=['GET'])
def preview_resume_2():
    return send_from_directory(static_dir, 'resume-preview-2.png')
