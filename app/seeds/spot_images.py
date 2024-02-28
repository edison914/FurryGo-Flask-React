from app.models import db, Spot_Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_spot_images():

    image1_1 = Spot_Image(
        spot_id=1,
        image_url="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image1_2 = Spot_Image(
        spot_id=1,
        image_url="https://images.pexels.com/photos/735869/pexels-photo-735869.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image2_1 = Spot_Image(
        spot_id=2,
        image_url="https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image2_2 = Spot_Image(
        spot_id=2,
        image_url="https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image3_1 = Spot_Image(
        spot_id=3,
        image_url="https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image3_2 = Spot_Image(
        spot_id=3,
        image_url='https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800'
    )
    image4_1 = Spot_Image(
        spot_id=4,
        image_url="https://images.pexels.com/photos/236940/pexels-photo-236940.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image4_2 = Spot_Image(
        spot_id=4,
        image_url="https://images.pexels.com/photos/1209978/pexels-photo-1209978.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image5_1 = Spot_Image(
        spot_id=5,
        image_url="https://images.pexels.com/photos/234248/pexels-photo-234248.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image5_2 = Spot_Image(
        spot_id=5,
        image_url="https://images.pexels.com/photos/226424/pexels-photo-226424.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image6_1 = Spot_Image(
        spot_id=6,
        image_url="https://images.pexels.com/photos/772429/pexels-photo-772429.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image6_2 = Spot_Image(
        spot_id=6,
        image_url="https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image7_1 = Spot_Image(
        spot_id=7,
        image_url="https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image7_2 = Spot_Image(
        spot_id=7,
        image_url="https://images.pexels.com/photos/14407415/pexels-photo-14407415.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image8_1 = Spot_Image(
        spot_id=8,
        image_url="https://images.pexels.com/photos/65438/pexels-photo-65438.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image8_2 = Spot_Image(
        spot_id=8,
        image_url="https://images.pexels.com/photos/7791038/pexels-photo-7791038.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image9_1 = Spot_Image(
        spot_id=9,
        image_url="https://images.pexels.com/photos/264279/pexels-photo-264279.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image9_2 = Spot_Image(
        spot_id=9,
        image_url="https://images.pexels.com/photos/1757433/pexels-photo-1757433.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image10_1 = Spot_Image(
        spot_id=10,
        image_url="https://images.pexels.com/photos/3709361/pexels-photo-3709361.jpeg?auto=compress&cs=tinysrgb&w=800"
    )
    image10_2 = Spot_Image(
        spot_id=10,
        image_url="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800"
    )

    db.session.add(image1_1)
    db.session.add(image1_2)
    db.session.add(image2_1)
    db.session.add(image2_2)
    db.session.add(image3_1)
    db.session.add(image3_2)
    db.session.add(image4_1)
    db.session.add(image4_2)
    db.session.add(image5_1)
    db.session.add(image5_2)
    db.session.add(image6_1)
    db.session.add(image6_2)
    db.session.add(image7_1)
    db.session.add(image7_2)
    db.session.add(image8_1)
    db.session.add(image8_2)
    db.session.add(image9_1)
    db.session.add(image9_2)
    db.session.add(image10_1)
    db.session.add(image10_2)

    db.session.commit()

def undo_spot_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.spot_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spot_images"))

    db.session.commit()
