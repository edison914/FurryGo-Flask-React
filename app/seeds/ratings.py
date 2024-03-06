from app.models import db, Rating, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_ratings():

    user_spot_ratings = set()
    #create a set to keep track of the spot and rating pairs.

    for _ in range(50):

        user_id=random.randrange(1, 24),
        spot_id=random.randrange(1, 11)

        # check to see if the random userId and spotId is already in the set
        while (user_id, spot_id) in user_spot_ratings:
                user_id=random.randrange(1, 24),
                spot_id=random.randrange(1, 11)

        new_rating = Rating(
            bone_rating=random.randrange(1, 6),
            user_id= user_id,
            spot_id = spot_id
        )

        #add the userId and spotId to the set
        user_spot_ratings.add((user_id, spot_id))
        db.session.add(new_rating)

    db.session.commit()

def undo_ratings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ratings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ratings"))

    db.session.commit()
