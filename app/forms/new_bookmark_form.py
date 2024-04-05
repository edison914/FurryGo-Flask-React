from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

class NewBookmarkForm(FlaskForm):
    def no_white_space(FlaskForm, field):
        if field.data and field.data.startswith(" "):
            raise ValidationError("Content should not start with whitespace.")
        if field.data and field.data.endswith(" "):
            raise ValidationError("Content should not end with whitespace.")

    name = StringField('name', validators=[DataRequired(), no_white_space])
