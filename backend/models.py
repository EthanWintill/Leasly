from datetime import datetime
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Sublease(db.Model):
    id = db.Column(db.String(40), primary_key=True)
    subleaser_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    apartment_name = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    rent = db.Column(db.Integer, nullable=False)
    bed = db.Column(db.Integer, nullable=True)
    bath = db.Column(db.Integer, nullable=True)
    sqft = db.Column(db.Double, nullable=True)
    location = db.Column(db.String(20), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'subleaser_id': self.subleaser_id,
            'apartment_name': self.apartment_name,
            'description': self.description,
            'rent': self.rent,
            'bed': self.bed,
            'bath': self.bath,
            'sqft': self.sqft,
            'location': self.location
        }


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text, nullable=False)
    name = db.Column(db.Text, nullable=False)
    password = db.Column(db.Text, nullable=False)

class Messages(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    datetime = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
