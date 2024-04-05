from app.models import db, Bookmark, environment, SCHEMA
from sqlalchemy.sql import text

def seed_bookmarks ():

    new_bookmark1 = Bookmark (
        name = "Demo's Bookmark 1",
        user_id = 1
    )
    new_bookmark2 = Bookmark (
        name = "Demo's Bookmark 2",
        user_id = 1
    )

    new_bookmark3 = Bookmark (
        name = "My Favorite",
        user_id = 2
    )
    new_bookmark4 = Bookmark (
        name = "My Go to!",
        user_id = 2
    )
    new_bookmark5 = Bookmark (
        name = "My Favroite",
        user_id = 3
    )
    new_bookmark6 = Bookmark (
        name = "Places to go",
        user_id = 4
    )
    new_bookmark7 = Bookmark (
        name = "Bookmark",
        user_id = 5
    )
    new_bookmark8 = Bookmark (
        name = "Wanted",
        user_id =6
    )
    new_bookmark9 = Bookmark (
        name = "Best places in VA",
        user_id = 7
    )
    new_bookmark10 = Bookmark (
        name = "Places that I love",
        user_id = 8
    )

    db.session.add(new_bookmark1)
    db.session.add(new_bookmark2)
    db.session.add(new_bookmark3)
    db.session.add(new_bookmark4)
    db.session.add(new_bookmark5)
    db.session.add(new_bookmark6)
    db.session.add(new_bookmark7)
    db.session.add(new_bookmark8)
    db.session.add(new_bookmark9)
    db.session.add(new_bookmark10)

    db.session.commit()

def undo_bookmarks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookmarks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookmarks"))

    db.session.commit()
