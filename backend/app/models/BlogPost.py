from app import db

# BlogPost model — maps to the 'blog_posts' table in PostgreSQL.
# Blog is not currently used in the frontend but the backend is ready for it.
# When you're ready to add a blog: build a Blog page in React and fetch from /api/blog
class BlogPost(db.Model):
    __tablename__ = 'blog_posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False)
    tags = db.Column(db.String(200), nullable=True)  # Optional — comma separated e.g. "Security,Python"

    # to_dict() converts a blog post row into a JSON-friendly dictionary for the API response
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'date_posted': self.date_posted.isoformat(),
            'tags': self.tags
        }
