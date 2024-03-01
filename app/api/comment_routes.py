from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Comment
from ..forms import NewCommentForm
from app.api.aws_helpers import (
    upload_file_to_s3,
    get_unique_filename,
    remove_file_from_s3,
)

comment_routes = Blueprint("comments", __name__)


@comment_routes.route("/<int:comment_id>", methods=["PUT", "PATCH"])
@login_required
def update_comment(comment_id):
    """
    revise a comment to a spot based on comment Id
    only when the comment belongs to current user
    """
    current_comment = Comment.query.get(comment_id)

    if not current_comment:
        return {"error": "no comment is found"}, 404

    if current_comment.user_id != current_user.id:
        return {"error": "Not Authorized"}, 403

    form = NewCommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        current_comment.comment_text = data["comment_text"]

        if form.image_url.data:
            image = data["image_url"]
            image.filename = get_unique_filename(image.filename)
            upload_image = upload_file_to_s3(image)
            image_url = upload_image["url"]

            if "url" not in upload_image:
                return {"error": "Upload was unsuccessful"}

            if "url" in upload_image:

                # retrive the old image url from current comment
                old_image_url = current_comment.image_url

                # check the old image url to see if its an aws link
                if "amazonaws" in old_image_url:
                    remove_file_from_s3(old_image_url)
                # reassign the new image url to the comment.
                current_comment.image_url = image_url
                db.session.commit()

        db.session.commit()

        return current_comment.to_dict()

    return form.errors, 401


@comment_routes.route("/<int:comment_id>", methods=["DELETE"])
@login_required
def delete_comment(comment_id):
    """
    delete a comment to a spot based on comment Id
    only when the comment belongs to current user
    """
    current_comment = Comment.query.get(comment_id)

    if not current_comment:
        return {"error": "no comment is found"}, 404

    if current_comment.user_id != current_user.id:
        return {"error": "Not Authorized"}, 403

    if current_comment.image_url and "amazonaws" in current_comment.image_url:
        remove_file_from_s3(current_comment.image_url)

    db.session.delete(current_comment)
    db.session.commit()

    return {"message": "succcessfully deleted"}
