from flask.cli import AppGroup
from .users import seed_users, undo_users
from .comments import seed_comments, undo_comments
from .spots import seed_spots, undo_spots
from .spot_images import seed_spot_images, undo_spot_images
from .bookmarks import seed_bookmarks, undo_bookmarks
from .boomark_spots import seed_bookmark_spots, undo_bookmark_spots
from .ratings import seed_ratings, undo_ratings
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_comments()
        undo_spots()
        undo_spot_images()
        undo_users()
        undo_bookmarks()
        undo_bookmark_spots()
        undo_ratings()
    seed_users()
    seed_spots()
    seed_spot_images()
    seed_comments()
    seed_bookmarks()
    seed_bookmark_spots()
    seed_ratings()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_bookmark_spots()
    undo_bookmarks()
    undo_comments()
    undo_spot_images()
    undo_ratings()
    undo_spots()
    undo_users()
    # Add other undo functions here
