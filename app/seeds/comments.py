from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
import random

comments = [
    "Absolutely loved the cozy ambiance and pet-friendly atmosphere!",
    "Great spot for a romantic dinner with your furry friend, impeccable service!",
    "The cocktails here are a must-try, and they even have water bowls for pets!",
    "Beautiful view, perfect for enjoying with your pet!",
    "Attentive staff and a diverse menu, with options for both you and your pet.",
    "Highly recommend the outdoor seating, especially for pet owners!",
    "Fantastic spot for brunch with friends, including your four-legged ones. Loved the pet-friendly patio!",
    "Exquisite decor and attention to detail, even for the pet accommodations!",
    "Family-friendly atmosphere with tasty options for both kids and pets.",
    "A hidden gem with incredible live music and a pet-friendly policy, perfect for a night out with your pup!",
    "Attended a private event here with my pet and was blown away by the hospitality towards pets.",
    "Quick service and great value for money, plus pet-friendly amenities!",
    "Perfect spot for a business lunch, quiet and professional, and pet-friendly too!",
    "Charming little cafe with the best treats for both humans and pets in town.",
    "Attended a pet-friendly cooking class here and had a blast!",
    "Cozy spot for a rainy day, loved curling up with my pet and a book.",
    "Attentive waitstaff made our anniversary dinner extra special, even for our pet!",
    "The rooftop bar offers stunning views and is pet-friendly!",
    "Delicious options for vegans, and they cater to pets too!",
    "The wine selection here is extensive, perfect for wine enthusiasts, and they allow pets!",
    "Quaint little spot for a leisurely Sunday brunch with your pet.",
    "Attended a pet-friendly wine tasting event here and was impressed by the hospitality.",
    "Incredible sushi, fresh and pet-friendly too!",
    "The staff went above and beyond to accommodate our dietary restrictions, including our pet's needs!",
    "Perfect spot for a girls' night out, great cocktails and atmosphere, and they welcome pets!",
    "A hidden gem with a menu that surprises and delights, with options for pets too!",
    "The outdoor seating area is beautifully landscaped, a great escape for both humans and pets!",
    "Attended a birthday party here and was impressed by the attention to detail, including pet accommodations!",
    "The desserts here are to die for, save room for a sweet treat for both you and your pet!",
    "Attentive and knowledgeable staff made our wine tasting experience unforgettable, and they even had treats for our pet!"
]

urls = [
    "https://images.pexels.com/photos/1612861/pexels-photo-1612861.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1346086/pexels-photo-1346086.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/422220/pexels-photo-422220.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1448055/pexels-photo-1448055.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/313979/pexels-photo-313979.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/5539949/pexels-photo-5539949.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/11844126/pexels-photo-11844126.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/15509711/pexels-photo-15509711/free-photo-of-a-dog-in-a-forest.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/15650165/pexels-photo-15650165/free-photo-of-cat-sitting-on-a-restaurant-counter.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/5371915/pexels-photo-5371915.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/15575664/pexels-photo-15575664/free-photo-of-tables-in-restaurant-interior.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/216216/pexels-photo-216216.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1528361/pexels-photo-1528361.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1406865/pexels-photo-1406865.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/260259/pexels-photo-260259.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=800",
]



def seed_comments():
    #loop over 100 times
    for _ in range(50):
        #create a comment instance based on random info below
        new_comment = Comment(
            #random comment
            comment_text=random.choice(comments),
            #random user
            image_url=random.choice(urls),
            user_id=random.randrange(1, 23),
            #random
            spot_id=random.randrange(1, 11)
        )
        db.session.add(new_comment)

    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
