from flask_wtf import FlaskForm
from wtforms import TextAreaField
from flask_wtf.file import FileField, FileAllowed
from wtforms.validators import DataRequired, Length, ValidationError
from app.api.aws_helpers import ALLOWED_IMAGE_EXTENSIONS

extension_joined = ", ".join(ALLOWED_IMAGE_EXTENSIONS)

class NewCommentForm(FlaskForm):
    def no_white_space(FlaskForm, field):
        if field.data and field.data.startswith(' '):
            raise ValidationError('Comment should not start with whitespace.')
        if field.data and field.data.endswith(' '):
            raise ValidationError('Comment should not end with whitespace.')

    comment_text = TextAreaField('Comment', validators=[DataRequired(), Length(max=255, min=10), no_white_space])

    image_url = FileField(
        "Image URL1",
        validators=[
            FileAllowed(
                list(ALLOWED_IMAGE_EXTENSIONS),
                message=f"Please choose a valid file extension. ({extension_joined})",
            ),
        ],
    )
