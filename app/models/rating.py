from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Rating(db.Model):
    __tablename__ = "ratings"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    spot_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("spots.id")), nullable=False
    )
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    bone_rating = db.Column(db.Float(2), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    # one spot can have many comments
    spot = db.relationship("Spot", back_populates="ratings")
    # one user can have many comments
    user = db.relationship("User", back_populates="ratings")

    # a function to return the spot_image in json format.
    def to_dict(self):
        return {
            "id": self.id,
            "spot_id": self.spot_id,
            "user_id": self.user_id,
            "user_nickname": self.user.nickname,
            "bone_rating": self.bone_rating,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
