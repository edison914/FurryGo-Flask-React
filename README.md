# `FurryGo`
FurryGo is an online community hub where pet lovers can discover and review animal-friendly businesses. The app was developed using Flask in Python for the backend and React.js for the frontend. Vue.js serves as the primary front-end tooling and build system. The demo provides users with features such as sign-up, sign-in, full CRUD operations on pet-friendly places, reviews with pictures, rating places, and bookmarking them. Additionally, images of the places and reviews are uploaded, updated, and maintained on AWS S3.

![Screenshot 2024-04-26 at 8 46 11 PM](https://github.com/edison914/FurryGo/assets/101605994/85d95ef0-45c1-49ca-b5eb-26ee7cbaf516)


## MVP - Feature & Implmentatiom
*Log-in and Sign-up*
* The server allows existing users to log in using their created email and password, which are hashed for protection on the backend.
* The server also allows new users to sign up for a new user account. There are email, username and password validators in place that prevent duplicate signups and mismatched passwords.
![Screenshot 2024-04-30 at 9 52 14 PM](https://github.com/edison914/FurryGo/assets/101605994/45d32896-c3d3-47de-ab1e-d2f8d8e3d3ff)
![Screenshot 2024-04-30 at 9 52 33 PM](https://github.com/edison914/FurryGo/assets/101605994/127474c0-c088-4e40-95fd-f95c00cc1714)


*CURD of Places*
* Users are able to view all places regardless of their log-in status.
* Users are able to see the details of a specific place regardless of their log-in status.
* Users are able to create a new place only when they are logged in.
* Users are able to edit places that were only created by them.
* Users are able to delete places that were only created by them.
![Screenshot 2024-04-30 at 10 03 03 PM](https://github.com/edison914/FurryGo/assets/101605994/b0a88cba-6327-499b-a466-56ea0b15f975)
![Screenshot 2024-04-30 at 10 03 24 PM](https://github.com/edison914/FurryGo/assets/101605994/7c2af651-771f-4a4c-85da-1cb9691a784c)


*CURD of Reviews*
* Users are able to view all reviews on the detail place page regardless of their log-in status.
* Users who are the creators of the current detail place aren't allowed to create comments.
* Users are able to create new reviews, with or without review pictures, only when they are logged in.
* Users are able to edit/update review comments or pictures on the detail place page that were only created by them.
* Users are able to delete reviews on the detail place page that were only created by them.
![Screenshot 2024-04-30 at 10 10 55 PM](https://github.com/edison914/FurryGo/assets/101605994/7d40f279-9ee2-4ff7-82b0-46b2827a356c)
![Screenshot 2024-04-30 at 10 10 08 PM](https://github.com/edison914/FurryGo/assets/101605994/846240a5-2a35-4423-b3c2-dd5f4224bb7e)


*CURD of Ratings*
* Users are able to view average bone rating of a place on both detail place page or home page regardless of their log-in status.
* Users are able to create new bone rating only when they are logged in.
* Users are able to edit/update bone rating on detail place page only when they are logged in.
* Users are able to delete bone rating on the detail place page that were only created by them.
![Screenshot 2024-04-30 at 10 14 55 PM](https://github.com/edison914/FurryGo/assets/101605994/20f05b50-ccf1-4fba-bd4e-8789d931eb69)


*CURD of bookmarks*
* Users are able to view their bookmarks only when they are logged in.
* Users are able to create new bookmarks only when they are logged in.
* Users are able to delete a bookmark that they previously created.
* Users are able to edit the name of a bookmark that they previously created.
* Users are able to add a place to a bookmark on the detail place page only when they are logged in.
* Users are able to delete a place from a bookmark on the bookmarks page on when they are logged in.
![Screenshot 2024-04-30 at 10 20 14 PM](https://github.com/edison914/FurryGo/assets/101605994/549f5a68-9e83-41b4-9247-7bc7ee22a586)
![Screenshot 2024-04-30 at 10 19 29 PM](https://github.com/edison914/FurryGo/assets/101605994/a691372d-c807-4e81-90b5-c9ea946aca03)


*Use of GoogleMap API*
* The React component for the Google Maps API is utilized on the detail place page, utilizing the longitude and latitude coordinates initially provided by the place creator upon creation. Regardless of their log-in status, any user can view the map, zoom in and out, and switch between satellite or map view.
![Screenshot 2024-04-30 at 10 34 39 PM](https://github.com/edison914/FurryGo/assets/101605994/f11e2eec-205c-4e87-bbff-a0d2090ad441)
![Screenshot 2024-04-30 at 10 30 47 PM](https://github.com/edison914/FurryGo/assets/101605994/2553f2db-ea1c-4cb8-b087-5ddeeaa52321)


*Use of AWS S3*
* All pictures for places and reviews are uploaded, stored, and managed on an AWS S3 bucket. Only logged-in users are able to perform these actions. Whenever a user deletes an image, it is also removed from the AWS S3 bucket. Similarly, when a user edits or updates an image, the old image is deleted from the bucket, and the new image is uploaded to the bucket. The backend database then updates the image URL to reflect the latest upload. This dynamic upload/update process ensures optimal space utilization on the AWS S3 Bucket, preventing the accumulation of legacy files that are unused and inaccessible.


# DB Diagram for the Backend Database
![FurryGo (1)](https://github.com/edison914/furrygo/assets/101605994/0eae4ea5-e872-46ae-ae20-74fe9fa48f98)
