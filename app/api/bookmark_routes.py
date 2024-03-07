from flask import Blueprint, request
from flask_login import login_required, current_user
from ..forms import NewBookmarkForm
from app.models import db, Bookmark, Spot


bookmark_routes = Blueprint("bookmarks", __name__)

# Get all bookmarks by current user
@bookmark_routes.route("/current", methods=["GET"])
@login_required
def get_all_bookmarks_by_user():
    """
    Query all bookmarks for current user
    """
    all_bookmarks = Bookmark.query.filter(Bookmark.user_id == current_user.id)

    if not all_bookmarks:
        return {"bookmarks" : []}

    return {"bookmarks": [bookmark.to_dict() for bookmark in all_bookmarks]}

#create a bookmark
@bookmark_routes.route('/new', methods=["POST"])
@login_required
def create_a_bookmark():
    form = NewBookmarkForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        new_bookmark = Bookmark (
            name = data["name"],
            user_id = current_user.id
        )
        # print("new_bookmark",new_bookmark)
        db.session.add(new_bookmark)
        db.session.commit()

        return new_bookmark.to_dict()

    return form.errors, 401

#edit a bookmark
@bookmark_routes.route('/<int:bookmark_id>', methods=["PUT", "PATCH"])
@login_required
def edit_a_bookmark(bookmark_id):
    current_bookmark = Bookmark.query.get(bookmark_id)

    if not current_bookmark:
        return {"error": "No rating is found"}, 404

    if current_bookmark.user_id != current_user.id:
        return {"error": "Not Authorized"}, 403

    form = NewBookmarkForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        current_bookmark.name = data["name"]
        db.session.commit()

        return current_bookmark.to_dict()

    return form.errors, 401


#delete a bookmark
@bookmark_routes.route('/<int:bookmark_id>', methods=["DELETE"])
@login_required
def delete_a_bookmark(bookmark_id):

    current_bookmark = Bookmark.query.get(bookmark_id)

    if not current_bookmark:
        return {"error": "No rating is found"}, 404

    if current_bookmark.user_id != current_user.id:
        return {"error": "Not Authorized"}, 403

    db.session.delete(current_bookmark)
    db.session.commit()

    return {"message": "succcessfully deleted"}


#get all places of a bookmark for current user
@bookmark_routes.route('/<int:bookmark_id>/spots', methods=['GET'])
@login_required
def get_places_of_a_bookmark (bookmark_id):

    current_bookmark = Bookmark.query.get(bookmark_id)
    # print("current bookmark", current_bookmark)
    if not current_bookmark:
        return {"error": "No bookmark is found"}, 404

    if current_bookmark.user_id != current_user.id:
        return {"error": "You can't view bookmark that is not yours"}

    spots_in_current_bookmark = current_bookmark.spots

    #should i create bookmark_spot or just assign these to spots?
    return {"bookmark_spots": [spot.to_dict() for spot in spots_in_current_bookmark]}

#delete a place in a bookmark for current user
@bookmark_routes.route('/<int:bookmark_id>/spots/<int:spot_id>', methods=['DELETE'])
@login_required
def delete_a_place_from_bookmark (bookmark_id, spot_id):

    current_bookmark = Bookmark.query.get(bookmark_id)

    if not current_bookmark:
        return {"error": "No bookmark is found"}, 404

    if current_bookmark.user_id != current_user.id:
        return {"error": "Not Authorized"}, 403

    selected_spot = Spot.query.get(spot_id)

    if not selected_spot:
        return {"error": "No spot is found"}, 404

    current_bookmark.spots.remove(selected_spot)
    db.session.commit()

    return {"message": "spot deleted from the current bookmark"}


#add a place to a bookmark for current user
@bookmark_routes.route("/<int:bookmark_id>/spots/<int:spot_id>", methods=["POST"])
@login_required
def add_spot_to_bookmark(bookmark_id, spot_id):

    current_bookmark = Bookmark.query.get(bookmark_id)

    if not current_bookmark:
        return {"error": "No bookmark is found"}, 404

    if current_user.id != current_bookmark.user_id:
        return {"error": "Not Authorized"}, 403

    selected_spot = Spot.query.get(spot_id)

    current_bookmark.spots.append(selected_spot)
    db.session.commit()

    return {'message':'spot added to the current bookmark'}
