from flask import Blueprint, request
from ..forms import NewRatingForm
from flask_login import login_required, current_user
from app.models import db, Rating

rating_routes = Blueprint("ratings", __name__)

#get average rating
"""
average rating is eagerly loaded in spot.to_to_dict as a key value pair.
no seperate route created.
"""

#get all ratings
"""
all ratings per spot is eagerly loaded in spot.to_to_dict as a list.
no seperate route created.
"""


# revise a rating
@rating_routes.route("/<int:rating_id>", methods=["PUT", "PATCH"])
@login_required
def update_a_rating(rating_id):
    current_rating = Rating.query.get(rating_id)

    if not current_rating:
        return {"error": "No rating is found"}, 404

    if current_rating.user_id != current_user.id:
        return {"error": "Not Authorized"}, 403

    form = NewRatingForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        current_rating.bone_rating = data["bone_rating"]

        db.session.commit()

        return current_rating.to_dict()

    return form.erros, 401


# delete a rating
@rating_routes.route("/<int:rating_id>", methods=["DELETE"])
@login_required
def delete_a_rating(rating_id):
    current_rating = Rating.query.get(rating_id)

    if not current_rating:
        return {"error": "No rating is found"}, 404

    if current_rating.user_id != current_user.id:
        return {"error": "Not Authorized"}, 403

    db.session.delete(current_rating)
    db.session.commit()

    return {"message": "succcessfully deleted"}
