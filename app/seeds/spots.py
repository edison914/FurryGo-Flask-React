from app.models import db, Spot, environment, SCHEMA
from sqlalchemy.sql import text

categorys = [
    "restaurants",
    "cafes",
    "parks",
    "events",
    "hotels",
    "shops",
]


def seed_spots():
    rest1 = Spot(
        user_id=1,
        category="Restaurants",
        address="1617 Washington Plaza N",
        city="Reston",
        state="VA",
        zip_code=20190,
        lat=38.969623289959394,
        lng=-77.34081517627104,
        name="Kalypso's Sports Tavern",
        description="Voted 'Best Al Fresco Dining in Northern Virginia' by Northern Virginia Magazine in 2021 and 2022, Kalypso's Sports Tavern offers waterfront seating adjacent to serene Lake Anne. The menu is heavily inspired by Mediterranean traditions with hummus, tzatziki, spanakopita, falafel, gyro, and more. Yum!",
        website="https://www.kalypsossportstavern.com/",
        phone_number=7037070660,
    )
    rest2 = Spot(
        user_id=2,
        category="Restaurants",
        address="14333 Newbrook Dr",
        city="Chantilly",
        state="VA",
        zip_code=20151,
        lat=38.87872794637163,
        lng=-77.44164798518523,
        name="Lazy Dog Restaurant & Bar",
        description="Lazy Dog Restaurant & Bar (with locations in Fairfax and Chantilly) is a relaxed, 'lodge-chic' dining environment serving comfort food favorites such as pot roast, chicken pot pie, and BBQ bison meatloaf. Inspired by unplanned adventures, an enduring love of food, and fireside conversations, Lazy Dog was created to invoke the small mountain town vibe where the founders grew up in the Rocky Mountains. Your fluffy friend can even enjoy a special dog menu on the patio. Choices include grilled hamburger patty or grilled chicken breast served with brown rice.",
        website="https://lazydogrestaurants.com/",
        phone_number=5716169093,
    )
    rest3 = Spot(
        user_id=3,
        category="Restaurants",
        address="130 N Washington St",
        city="Falls Church",
        state="VA",
        zip_code=22046,
        lat=38.88286281180131,
        lng=-77.17015197455787,
        name="Clare & Don's Beach Shack",
        description="Clare & Don's Beach Shack offers beach-themed cuisine, including seafood, specialty cocktails, and vegetarian fare. Not to mention, they regularly host live music, karaoke, and trivia nights! Grab a taste of the beach right here in Fairfax County with man's (and woman's!) best friend. (Best to call ahead to check about bringing your pup along.)",
        website="https://lazydogrestaurants.com/",
        phone_number=7035329283,
    )
    park1 = Spot(
        user_id=1,
        category="Parks",
        address="700 Courthouse Rd",
        city="Vienna",
        state="VA",
        zip_code=22180,
        lat=38.88896279266404,
        lng=-77.27300536106488,
        name="Vienna Dog Park",
        description="Conveniently situated off of Nutley Street at Courthouse Road and Moorefield Road SW, the Vienna Dog Park will soon be Fido's favorite place to hang out.  This dog park is completely fenced in with a five-foot high fence and double gates for safe entry and exit. The surface consists of stone dust, a very fine crushed stone. Several benches are located within the off-leash area. The play area is shaded by mature trees, providing a cool and safe retreat for dogs and their families. Water is available onsite as well. All dogs must be licensed by the Town of Vienna or Fairfax County and be at least four months old. This cozy park is surrounded by lush greenery and has a few walking trails nearby that connect to Fairfax County's Nottoway Park, making it the perfect place to play with your dog.",
        website="https://www.viennava.gov/Home/Components/FacilityDirectory/FacilityDirectory/24/67/",
        phone_number=7032556360,
    )
    park2 = Spot(
        user_id=1,
        category="Parks",
        address="301 S Harrison St",
        city="Arlington",
        state="VA",
        zip_code=22204,
        lat=38.86276048223148,
        lng=-77.11741826137214,
        name="Glencarlyn Dog Park",
        phone_number=7036423633,
        description="The Glencarlyn Park is an expansive 95.5 acre creekside park, and a true gem in Arlington, Virginia. This park is a woofderful space to enjoy a family outing, some peace in nature, or quality time with your canine companion. There is something in this family-oriented park for everyone, including an off-leash area for the doggos!  The off-leash area can be tricky to find, because it's not fenced in. After crossing a little footbridge, you'll find other puppers playing near the shallow, clear, stream. Although the park is not fenced in, it's bordered by the stream and a steep hill which keeps dogs in the valley. It's not near the streets, but be sure your pal doesn't chase a squirrel into the woods and get lost! There are nature paths, woods, and hills, that your pooch can scamper through like a wild dog before cooling off in the stream. Pet-parents love bringing their dogs here, so Fido shouldn't have any problems finding playmates!",
        website="https://www.arlingtonva.us/Government/Departments/Parks-Recreation/Locations/Parks/Glencarlyn-Park/Glencarlyn-Dog-Park",
    )
    park3 = Spot(
        user_id=2,
        category="Parks",
        address="2710 S Oakland St",
        city="Arlington",
        state="VA",
        zip_code=22206,
        lat=38.84420228660024,
        lng=-77.0905575460291,
        name="Shirlington Dog Park",
        description="The Shirlington Dog Park was established over thirty years ago and was one of the first officially recognized off-leash dog exercise areas in the region. Being approximately two acres in size, its narrow, quarter-mile length with an accessible trail, runs along an urban stream on the one side and warehouse buildings on the other. There is also a separate adjoining area for small dogs. It is open every day of the year during daylight hours and receives nearly 200,000 visits annually.  In a Washington Post article on the Shirlington neighborhood the dog park is mentioned prominently and stresses its importance to the area.  Shirlington Dog Park consistently is named one of the best dog parks in the region, including in the June 2018 issue of Northern Virginia Magazine.",
        website="https://shirlingtondogs.org/",
        phone_number=7032286525,
    )

    shop1 = Spot(
        user_id=3,
        category="Shops",
        address="6555 Little River Turnpike",
        city="Alexandria",
        state="VA",
        zip_code=22312,
        lat=38.82603597483517,
        lng=-77.16045397766221,
        name="The Home Depot - Annadale",
        description="The Home Depot is a chain of dog-friendly hardware stores with a location in Annadale, VA. To ensure your next home project gets Fido's approval, take them down the aisles to pick out paint colors, accessories, and supplies for an interior or exterior makeover. Leashed dogs are welcome inside but should be kept close by and under your control at all times.",
        website="https://www.homedepot.com/l/Annandale/VA/Alexandria/22312/4640",
        phone_number=7036423660,
    )
    shop2 = Spot(
        user_id=4,
        category="Shops",
        address="1961 Chain Bridge Rd",
        city="Tysons",
        state="VA",
        zip_code=22102,
        lat=38.917377863371264,
        lng=-77.22229368326754,
        name="Tyson Corner Center",
        description="Massive mall with hundreds of upscale stores & eateries, plus a cinema & an elevated outdoor plaza. Pets are welcome as long as they arein a doggy stroller or carrier",
        website="https://https://www.tysonscornercenter.com/",
        phone_number=7038939400
    )
    event1 = Spot(
        user_id=4,
        category="Events",
        address="1500 South Capitol St SE",
        city="Washington",
        state="DC",
        zip_code=20003,
        lat=38.87326390812088,
        lng=-77.00733122112801,
        name="Pups in the Park with the Washington Nationals",
        description="Mark your calendars for Pups in the Park with the Washington Nationals! This dog friendly event will be held certain dates throughout the season from start to TBD (see official website for game times) on Apr 5, 2024 to Sep 27, 2024 at Nationals Park in Washington, DC, US. Admission is $35/human and $10/dog and benefits Humane Rescue Alliance.",
        website="https://www.mlb.com/nationals/tickets/specials/pups-in-the-park",
        phone_number=2026407639
    )

    hotel1 = Spot(
        user_id=5,
        category="Hotels",
        address="3950 Fair Ridge Dr",
        city="Fairfax",
        state="VA",
        zip_code=22033,
        lat=38.87335703084946,
        lng=-77.37078492328482,
        name="Hilton Garden Inn Fairfax",
        description="Located off Highway 50, we’re minutes from Fair Ridge Park and Fair Oaks Mall, and five miles from Dulles Expo Center. Vienna Metro Station is a 10-minute drive, and the Washington Dulles Airport is 11 miles from our door. Enjoy breakfast, dinner, and evening room service from our Garden Grille & Bar. Pets are welcome to stay with a non-refundable fee of $75.00 per night. Max weight limit is 75lbs",
        website="https://www.hilton.com/en/hotels/iadfhgi-hilton-garden-inn-fairfax/?SEO_id=GMB-AMER-GI-IADFHGI&y_source=1_MjA4Mzk0NC03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D",
        phone_number=7033857774
    )
    db.session.add(rest1)
    db.session.add(rest2)
    db.session.add(rest3)
    db.session.add(park1)
    db.session.add(park2)
    db.session.add(park3)
    db.session.add(shop1)
    db.session.add(shop2)
    db.session.add(event1)
    db.session.add(hotel1)
    db.session.commit()


def undo_spots():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.spots RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spots"))

    db.session.commit()
