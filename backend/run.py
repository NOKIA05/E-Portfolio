# run.py — the entry point for the Flask backend.
# To start the server locally: python run.py
# IMPORTANT: Before deploying to production, set debug=False and use Gunicorn instead:
#   gunicorn "app:create_app()"
from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
