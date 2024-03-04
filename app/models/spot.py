from .db import db, environment, SCHEMA, add_prefix_for_prod

from datetime import datetime


bookmark_spots = db.Table(
    'bookmark_spots',
    db.Column('bookmark_id', db.Integer, db.ForeignKey(add_prefix_for_prod('bookmarks.id')), primary_key=True),
    db.Column('spot_id', db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), primary_key=True)
)

if environment == "production":
    bookmark_spots.schema = SCHEMA


class Spot(db.Model):
    __tablename__ = "spots"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    category = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(150), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    lat = db.Column(db.Float(50), nullable=False)
    lng = db.Column(db.Float(50), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(5000), nullable=False)
    website = db.Column(db.String(200), nullable=True)
    phone_number = db.Column(db.String(10), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    # one user can have many spots
    user = db.relationship("User", back_populates="spots")

    # one spot can have many comments
    comments = db.relationship("Comment", back_populates="spot", cascade="all, delete")

    # one spot can have many spotImages
    spot_images = db.relationship(
        "Spot_Image", back_populates="spot", cascade="all, delete"
    )

    # one spot can have many spotImages
    ratings = db.relationship(
        "Rating", back_populates="spot", cascade="all, delete"
    )


    #many to many between spots and bookmarks goes here
    bookmarks = db.relationship('Bookmark', secondary=bookmark_spots, back_populates='spots')

    # a function to return the spot in json format.
    def to_dict(self):
        average_rating = None
        if self.ratings:
            total_ratings = sum(self.ratings)
            average_rating = total_ratings / len(self.ratings)

        return {
            "id": self.id,
            "user_id": self.user_id,
            "user_nickname": self.user.nickname,
            "spot_images": list(
                spot_image.to_dict() for spot_image in self.spot_images
            ),
            "category": self.category,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zip_code": self.zip_code,
            "lat": self.lat,
            "lng": self.lng,
            "name": self.name,
            "description": self.description,
            "website": self.website,
            "phone_number": self.phone_number,
            "ratings": self.ratings,
            "average_rating": average_rating,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
