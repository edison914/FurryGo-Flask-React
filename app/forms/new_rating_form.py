from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import InputRequired

class NewRatingForm(FlaskForm):
    bone_rating = IntegerField('bone rating', validators=[InputRequired()])
