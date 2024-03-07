from app.models import db, Rating, Spot, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_ratings():

    # user_spot_ratings = set()
    #create a set to keep track of the spot and rating pairs.

    # for spot in spots:

    #     user_id=spot
    #     spot_id=random.randrange(1, 11)

        # check to see if the random userId and spotId is already in the set
        # while (user_id, spot_id) in user_spot_ratings:
        #         user_id=random.randrange(1, 24),
        #         spot_id=random.randrange(1, 11)

        # new_rating = Rating(
        #     bone_rating=random.randrange(1, 6),
        #     user_id= user_id,
        #     spot_id = spot_id
        # )

        #add the userId and spotId to the set
        # user_spot_ratings.add((user_id, spot_id))
        # db.session.add(new_rating)

    spots = Spot.query.all()

    for spot in spots:
        spot = Spot.query.get(spot.id)
        comments=spot.comments

        for comment in comments:
            user_id = comment.user_id
            spot_id = comment.spot_id
            new_rating = Rating(
                bone_rating=random.randrange(1, 6),
                user_id= user_id,
                spot_id = spot_id
            )
            db.session.add(new_rating)

    db.session.commit()

def undo_ratings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ratings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ratings"))

    db.session.commit()
