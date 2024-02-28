from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TextAreaField, SelectField, IntegerField, DecimalField, URLField, TelField
from wtforms.validators import DataRequired, Length, AnyOf, ValidationError
from app.api.aws_helpers import ALLOWED_IMAGE_EXTENSIONS

extension_joined = ", ".join(ALLOWED_IMAGE_EXTENSIONS)

category = [
    "restaurants",
    "cafes",
    "parks",
    "events",
    "hotels",
    "shops",
]

class EditSpotForm(FlaskForm):
    def no_white_space(FlaskForm, field):
        if field.data and field.data.startswith(" "):
            raise ValidationError("Content should not start with whitespace.")
        if field.data and field.data.endswith(" "):
            raise ValidationError("Content should not end with whitespace.")

    category = StringField(
        "Category",
        validators=[DataRequired(), AnyOf(category, message="Select a category")],
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

    zip_code = IntegerField("Zip Code", validators=[DataRequired(), no_white_space])

    lat = DecimalField(
        "Lat", places=5, rounding=None, validators=[DataRequired(), no_white_space]
    )

    lng = DecimalField(
        "Lng", places=5, rounding=None, validators=[DataRequired(), no_white_space]
    )

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
            Length(max=5000, message="Description cannot be longer than 5000 characters"),
            no_white_space,
        ],
    )

    website = URLField(
        "website",
        validators=[
            DataRequired(),
            Length(max=200, message="website url cannot be longer than 200 characters"),
            no_white_space,
        ],
    )

    phone_number = IntegerField(
        "Phone number",
        validators=[
            DataRequired(),
            Length(min=10, max=10, message="Phone number must be 10 digits only"),
            no_white_space,
        ],
    )

    image_url1 = FileField(
        "Image URL1",
        validators=[
            FileAllowed(
                list(ALLOWED_IMAGE_EXTENSIONS),
                message=f"Please choose a valid file extension. ({extension_joined})",
            ),
        ],
    )

    image_url2 = FileField(
        "Image URL2",
        validators=[
            FileAllowed(
                list(ALLOWED_IMAGE_EXTENSIONS),
                message=f"Please choose a valid file extension. ({extension_joined})",
            ),
        ],
    )
