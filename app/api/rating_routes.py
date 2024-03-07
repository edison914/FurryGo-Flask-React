from flask import Blueprint, request
from app.models import db, Comment, Spot

rating_routes = Blueprint("ratings", __name__)


"""
average rating is eagerly loaded in spot.to_to_dict as a key value pair.
"""


"""
all ratings per spot is eagerly loaded in spot.to_to_dict as a list.
"""
