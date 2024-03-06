from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TextAreaField, IntegerField, DecimalField, URLField
from wtforms.validators import (
    DataRequired,
    Length,
    AnyOf,
    ValidationError,
    InputRequired,
)
from app.api.aws_helpers import ALLOWED_IMAGE_EXTENSIONS

extension_joined = ", ".join(ALLOWED_IMAGE_EXTENSIONS)

category = [
    "Restaurants",
    "Cafes",
    "Parks",
    "Events",
    "Hotels",
    "Shops",
]


class EditSpotForm(FlaskForm):

    def zip_code_check(FlaskForm, field):
        if field.data and len(str(field.data)) != 5:
            raise ValidationError("Zip code must be 5 digits only.")

    def no_white_space(FlaskForm, field):
        if field.data and field.data.startswith(" "):
            raise ValidationError("Content should not start with whitespace.")
        if field.data and field.data.endswith(" "):
            raise ValidationError("Content should not end with whitespace.")

    def check_phone_digits(FlaskForm, field):
        if field.data and len(str(field.data)) != 10:
            raise ValidationError("Phone number must be 10 digits only.")

    category = StringField(
        "Category",
        validators=[
            DataRequired(),
            AnyOf(category, message="Select a category"),
            no_white_space,
        ],
    )

    address = StringField(
        "Address",
        validators=[
            DataRequired(),
            Length(max=150, message="Address cannot be longer than 150 characters"),
            no_white_space,
        ],
    )

    city = StringField(
        "City",
        validators=[
            DataRequired(),
            Length(max=50, message="City cannot be longer than 50 characters"),
            no_white_space,
        ],
    )

    state = StringField(
        "State",
        validators=[
            DataRequired(),
            Length(max=50, message="State cannot be longer than 50 characters"),
            no_white_space,
        ],
    )

    zip_code = IntegerField("Zip Code", validators=[zip_code_check, InputRequired()])

    lat = DecimalField("Lat", places=5, rounding=None, validators=[InputRequired()])

    lng = DecimalField("Lng", places=5, rounding=None, validators=[InputRequired()])

    name = StringField(
        "Name",
        validators=[
            DataRequired(),
            Length(max=100, message="Name cannot be longer than 100 characters"),
            no_white_space,
        ],
    )

    description = TextAreaField(
        "Description",
        validators=[
            DataRequired(),
            Length(
                min=20,
                max=5000, message="Description should be between 20 and 5000 characters"
            ),
            no_white_space,
        ],
    )

    website = URLField(
        "website",
        validators=[
            Length(max=200, message="website url cannot be longer than 200 characters"),
            no_white_space,
        ],
    )

    phone_number = StringField("Phone number", validators=[check_phone_digits])

    image_url1 = FileField(
        "Image URL1",
        validators=[
            FileAllowed(
                list(ALLOWED_IMAGE_EXTENSIONS),
                message=f"Please choose a valid file extension. ({extension_joined})",
            )
        ],
    )

    image_url2 = FileField(
        "Image URL2",
        validators=[
            FileAllowed(
                list(ALLOWED_IMAGE_EXTENSIONS),
                message=f"Please choose a valid file extension. ({extension_joined})",
            )
        ],
    )
