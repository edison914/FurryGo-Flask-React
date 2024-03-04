from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use. Choose another one.")


def nickname_exists(form, field):
    # Checking if nickname is already in use
    nickname = field.data
    user = User.query.filter(User.nickname == nickname).first()
    if user:
        raise ValidationError("Nickname is already in use. Choose another one.")


def no_email(form, field):
    if "@" in field.data:
        raise ValidationError("Do not use an email for your nickname.")


class SignUpForm(FlaskForm):
    nickname = StringField(
        "nickname", validators=[DataRequired(), nickname_exists, no_email]
    )
    email = StringField("email", validators=[DataRequired(), user_exists, Email()])
    password = StringField("password", validators=[DataRequired()])
