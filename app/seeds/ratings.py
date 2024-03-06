from app.models import db, Rating, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_ratings():

    for _ in range(50):
        new_rating = Rating(
            bone_rating=random.randrange(1, 6),

            user_id=random.randrange(1, 20),

            spot_id=random.randrange(1, 11)
        )
        db.session.add(new_rating)

    db.session.commit()

def undo_ratings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ratings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ratings"))

    db.session.commit()
