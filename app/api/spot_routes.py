from flask import Blueprint, redirect, request, jsonify
from flask_login import login_required, current_user
from app.models import Spot, Spot_Image, Rating, Comment, db
from ..forms import NewSpotForm, EditSpotForm, NewCommentForm, NewRatingForm
from app.api.aws_helpers import (
    upload_file_to_s3,
    get_unique_filename,
    remove_file_from_s3,
)

spot_routes = Blueprint("spots", __name__)


@spot_routes.route("")
def all_spots():
    """
    Query for spots, no filters
    """
    all_spots = Spot.query.all()
    return {"spots": [spot.to_dict() for spot in all_spots]}


@spot_routes.route("/current")
@login_required
def all_spots_by_current_user():
    """
    Query for all spots created by current user and returns them in a list of spots dictionaries
    """
    all_spots = Spot.query.filter(Spot.user_id == current_user.id)

    if not all_spots:
        return {"spots": []}

    return {"spots": [spot.to_dict() for spot in all_spots]}


@spot_routes.route("/<int:id>")
def get_spot_by_id(id):
    """
    Query for one single spot by spotId
    """
    spot = Spot.query.get(id)

    if not spot:
        return {"error": "Spot is not found"}, 404

    return {"spots": [spot.to_dict()]}


@spot_routes.route("", methods=["POST"])
@login_required
def create_a_spot():
    """
    Create a new spot
    """
    form = NewSpotForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        image1 = data["image_url1"]
        image2 = data["image_url2"]
        image1.filename = get_unique_filename(image1.filename)
        image2.filename = get_unique_filename(image2.filename)

        upload_image1 = upload_file_to_s3(image1)
        upload_image2 = upload_file_to_s3(image2)

        if "url" not in upload_image1 or "url" not in upload_image2:
            return {"error": "Upload was unsuccessful"}

        # print("upload_image1.", upload_image1)

        image1_url = upload_image1["url"]

        # print("image1_url.", image1_url)

        image2_url = upload_image2["url"]

        new_spot = Spot(
            user_id=current_user.id,
            category=data["category"],
            address=data["address"],
            city=data["city"],
            state=data["state"],
            zip_code=data["zip_code"],
            lat=data["lat"],
            lng=data["lng"],
            name=data["name"],
            description=data["description"],
            website=data["website"],
            phone_number=data["phone_number"],
        )

        db.session.add(new_spot)
        db.session.commit()

        new_spot_image1 = Spot_Image(spot_id=new_spot.id, image_url=image1_url)
        new_spot_image2 = Spot_Image(spot_id=new_spot.id, image_url=image2_url)

        db.session.add(new_spot_image1)
        db.session.add(new_spot_image2)
        db.session.commit()

        return new_spot.to_dict()

    return form.errors, 401


@spot_routes.route("/<int:id>", methods=["PATCH", "PUT"])
@login_required
def update_spot(id):
    """
    Update a spot if owned by current user
    """
    spot = Spot.query.get(id)

    if not spot:
        return {"error": "Spot not found"}, 404

    if spot.user_id != current_user.id:
        return {"error": "Not Authorized"}, 403

    form = EditSpotForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        spot.category = data["category"]
        spot.address = data["address"]
        spot.city = data["city"]
        spot.state = data["state"]
        spot.zip_code = data["zip_code"]
        spot.lat = data["lat"]
        spot.lng = data["lng"]
        spot.name = data["name"]
        spot.description = data["description"]
        spot.website = data["website"]
        spot.phone_number = data["phone_number"]

        # if the form.image_url fileField contains any upload info
        print("image_url1", data['image_url1'])

        if data['image_url1']:
            image1 = data["image_url1"]
            image1.filename = get_unique_filename(image1.filename)
            upload_image1 = upload_file_to_s3(image1)
            image1_url = upload_image1["url"]

            if "url" not in upload_image1:
                return {"error": "Upload was unsuccessful"}

            # upload successful
            if "url" in upload_image1:
                # retrive the spot image1 in the database
                spot_image1 = Spot_Image.query.filter(
                    Spot_Image.spot_id == spot.id
                ).first()

                # retrive the old image url of spot image1 from the existing database
                old_image1_url = spot_image1.image_url
                # if the old url has amazonaws in the link,
                # delete the old image url record from aws
                if "amazonaws" in old_image1_url:
                    remove_file_from_s3(old_image1_url)

                # reassign the new image url of spot image1 to the new aws link
                # and commit
                spot_image1.image_url = image1_url
                db.session.commit()

        if data['image_url2']:
            image2 = data["image_url2"]
            image2.filename = get_unique_filename(image2.filename)
            upload_image2 = upload_file_to_s3(image2)
            image2_url = upload_image2["url"]

            if "url" not in upload_image2:
                return {"error": "Upload was unsuccessful"}

            if "url" in upload_image2:
                spot_image2 = (
                    Spot_Image.query.filter(Spot_Image.spot_id == spot.id)
                    .offset(1)
                    .first()
                )

                old_image2_url = spot_image2.image_url

                if "amazonaws" in old_image2_url:
                    remove_file_from_s3(old_image2_url)

                spot_image2.image_url = image2_url
                db.session.commit()

        db.session.commit()
        return spot.to_dict()

    return form.errors, 401


@spot_routes.route("/<int:spot_id>", methods=["DELETE"])
@login_required
def delete_spot(spot_id):
    """
    Delete spot if owned by current user
    """
    spot = Spot.query.get(spot_id)

    if not spot:
        return {"error": "Spot not found"}, 404

    if spot.user_id != current_user.id:
        return {"error": "Not Authorized"}, 403

    image1_url = spot.spot_images[0].image_url
    image2_url = spot.spot_images[1].image_url
    print("spotImage", image1_url)
    print("spotImage", image2_url)

    if "amazonaws" in image1_url or "amazonaws" in image2_url:
        remove_file_from_s3(image1_url)
        remove_file_from_s3(image2_url)

    db.session.delete(spot)
    db.session.commit()
    return {"message": "succcessfully deleted"}


@spot_routes.route("/<int:spot_id>/comments", methods=["GET"])
def get_comments_for_spot(spot_id):
    """
    Query for all comments based on the spot Id and returns the comments in a list
    """
    all_comments = (
        Comment.query.filter_by(spot_id=spot_id).order_by(Comment.updated_at).all()
    )
    print(all_comments)
    if not all_comments:
        return {"comments": []}

    return {"comments": [comment.to_dict() for comment in all_comments]}


@spot_routes.route("/<int:spot_id>/comments", methods=["POST"])
@login_required
def add_comments_for_spot(spot_id):
    """
    add a comment based on the spot Id and user Id
    """

    form = NewCommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        if data['image_url']:
            image = data["image_url"]
            image.filename = get_unique_filename(image.filename)
            upload_image = upload_file_to_s3(image)

            if "url" not in upload_image:
                return {"error": "Upload was unsuccessful"}

            image_url = upload_image["url"]

            new_comment = Comment(
                comment_text=form.data["comment_text"],
                image_url=image_url,
                user_id=current_user.id,
                spot_id=spot_id,
            )
            db.session.add(new_comment)
            db.session.commit()
            return new_comment.to_dict()

        if data['image_url'] == None:
            new_comment = Comment(
            comment_text=form.data["comment_text"],
            user_id=current_user.id,
            spot_id=spot_id,
            )
            print(new_comment)
            db.session.add(new_comment)
            db.session.commit()
            return new_comment.to_dict()


    return form.errors, 401


# add a rating to a spot
@spot_routes.route("/<int:spot_id>/ratings", methods=["POST"])
@login_required
def post_a_rating(spot_id):

    current_spot = Spot.query.get(spot_id)

    if not current_spot:
        return {"error": "No spot is found"}, 404

    if current_spot.user_id == current_user.id:
        return {"error": "You can't rate your own place"}, 403

    form = NewRatingForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        new_rating = Rating (
            spot_id = spot_id,
            user_id = current_user.id,
            bone_rating = data["bone_rating"]
        )

        db.session.add(new_rating)
        db.session.commit()

        return new_rating.to_dict()

    return form.erros, 401
