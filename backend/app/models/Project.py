from app import db

# Project model — maps to the 'projects' table in PostgreSQL.
# To add a new column: add a line here, then run a migration or recreate the DB.
# To add a project via psql: INSERT INTO projects (title, description) VALUES ('...', '...');
class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    github_url = db.Column(db.String(200), nullable=True)   # Optional — link to GitHub repo
    tags = db.Column(db.String(200), nullable=True)         # Optional — comma separated e.g. "Python,Flask"

    # to_dict() converts a project row into a JSON-friendly dictionary for the API response
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'github_url': self.github_url,
            'tags': self.tags
        }
