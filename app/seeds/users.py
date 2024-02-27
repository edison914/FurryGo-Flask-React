from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        nickname="Demo",
        email="demo@aa.io",
        password="password",
        profile_image="https://images.pexels.com/photos/179221/pexels-photo-179221.jpeg?auto=compress&cs=tinysrgb&w=600"
    )
    eddie = User(nickname="Bolt", email="eddie@aa.io", password="password", profile_image="https://images.pexels.com/photos/14440674/pexels-photo-14440674.jpeg?auto=compress&cs=tinysrgb&w=600")
    lucy = User(nickname="Blitz", email="lucy@aa.io", password="password", profile_image="https://images.pexels.com/photos/1972531/pexels-photo-1972531.jpeg?auto=compress&cs=tinysrgb&w=600")

    db.session.add(demo)
    db.session.add(eddie)
    db.session.add(lucy)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
