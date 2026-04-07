from flask import Blueprint, request, jsonify
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from app import limiter
import os

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/api/contact', methods=['POST'])
@limiter.limit("3 per minute")
def send_message():
    data = request.get_json()
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    message = data.get('message', '').strip()

    if not name or not email or not message:
        return jsonify({'error': 'All fields are required.'}), 400
    
    if len(message) > 2000:
        return jsonify({'error': 'Message is too long.'}), 400
    
    if '@' not in email:
        return jsonify({'error': 'Invalid email address.'}), 400
    msg = Mail(
        from_email=os.getenv('SENDGRID_FROM_EMAIL'),
        to_emails=os.getenv('MY_EMAIL'),
        subject=f'Portfolio Contact from {name}',
        plain_text_content=f'From: {name}\nEmail: {email}\n\n{message}'
    )

    sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
    sg.send(msg)

    return jsonify({'success': 'Message sent.'}), 200
