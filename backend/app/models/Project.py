from app import db

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    github_url = db.Column(db.String(200), nullable=True)
    tags = db.Column(db.String(200), nullable=True) #comma separated tags

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'github_url': self.github_url,
            'tags': self.tags
        }