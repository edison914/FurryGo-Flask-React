from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Spot_Image(db.Model):
    __tablename__= "spot_images"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), nullable=False)
    image_url = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    #one spot can have many spotImages
    spot = db.relationship("Spot", back_populates="spot_images")

    #a function to return the spot_image in json format.
    def to_dict(self):
        return {
            "id": self.id,
            "spot_id": self.spot_id,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
