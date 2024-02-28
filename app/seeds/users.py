from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

images = [
    "https://images.pexels.com/photos/19906834/pexels-photo-19906834/free-photo-of-nilgans.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/62324/leopard-safari-wildier-botswana-62324.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2710186/pexels-photo-2710186.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/5967959/pexels-photo-5967959.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1788929/pexels-photo-1788929.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/179221/pexels-photo-179221.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/14440674/pexels-photo-14440674.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/16577560/pexels-photo-16577560/free-photo-of-cat-lying-down.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/11361459/pexels-photo-11361459.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4597758/pexels-photo-4597758.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/15253147/pexels-photo-15253147/free-photo-of-black-dog-sitting-on-snow.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/16577560/pexels-photo-16577560/free-photo-of-cat-lying-down.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/16679045/pexels-photo-16679045/free-photo-of-cute-cat-looking-away.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/20130123/pexels-photo-20130123/free-photo-of-portrait-of-cute-dog.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/5321441/pexels-photo-5321441.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1186735/pexels-photo-1186735.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/13832168/pexels-photo-13832168.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/8895723/pexels-photo-8895723.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/7176277/pexels-photo-7176277.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/18150197/pexels-photo-18150197/free-photo-of-close-up-of-white-poodle.png?auto=compress&cs=tinysrgb&w=600",
]


faker = Faker()
users = []
for i in range(20):
    users.append(
        dict(
            nickname=faker.first_name(),
            email=faker.email(),
            password="password",
            profile_url=images[i],
        )
    )


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        nickname="Demo",
        email="demo@aa.io",
        password="password",
        profile_url="https://images.pexels.com/photos/179221/pexels-photo-179221.jpeg?auto=compress&cs=tinysrgb&w=600",
    )
    eddie = User(
        nickname="Bolt",
        email="eddie@aa.io",
        password="password",
        profile_url="https://images.pexels.com/photos/14440674/pexels-photo-14440674.jpeg?auto=compress&cs=tinysrgb&w=600",
    )
    lucy = User(
        nickname="Blitz",
        email="lucy@aa.io",
        password="password",
        profile_url="https://images.pexels.com/photos/1972531/pexels-photo-1972531.jpeg?auto=compress&cs=tinysrgb&w=600",
    )

    db.session.add(demo)
    db.session.add(eddie)
    db.session.add(lucy)

    for user in users:
        addtional_user = User(
            nickname=user["nickname"],
            email=user["email"],
            password="password",
            profile_url=user["profile_url"],
        )
        db.session.add(addtional_user)

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
