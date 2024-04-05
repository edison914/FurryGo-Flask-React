from app.models import db, environment, SCHEMA, Bookmark, Spot
from sqlalchemy.sql import text
import random


def seed_bookmark_spots():
    bookmarks = Bookmark.query.all()
    spots = Spot.query.all()

    for bookmark in bookmarks:
        random_spots_num = random.randrange(1, 11)

        random_spots_list = random.sample(spots, random_spots_num)

        bookmark.spots.extend(random_spots_list)

    db.session.commit()


def undo_bookmark_spots():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.bookmark_spots RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM bookmark_spots"))
    db.session.commit()
