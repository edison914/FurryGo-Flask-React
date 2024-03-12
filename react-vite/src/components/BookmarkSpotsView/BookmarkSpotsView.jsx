import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarkPlacesThunk } from "../../redux/bookmarks";
import "./BookmarkSpotsView.css";
import { Link } from "react-router-dom";

const BookmarkSpotsView = ({ bookmarkId, bookmarkName }) => {
  const places = useSelector((state) => state.bookmarks?.bookmarkSpots);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookmarkPlacesThunk(bookmarkId));
  }, [dispatch, bookmarkId]);

  //   console.log(bookmarkId);

  if (places.length == 0)
    return (
      <h3>
        You dont have anything in this bookmark. Checkout some awesome places to
        add!
      </h3>
    );
  return (
    <div className="bookmark-place-container">
      <h3>{bookmarkName}</h3>
      {places?.map((place) => (
        <div key={place.key} className="bookmark-place-view-container">
          <Link to={`/spots/${place.id}`}>
            <img src={place.spot_images[0].image_url} />
          </Link>

          <Link
            to={`/spots/${place.id}`}
            className="bookmark-place-text-rating"
          >
            <div>{place.name}</div>
            <div>
              {place.city},{place.state}{" "}
            </div>
            <div>Average Rating: {place.average_rating}</div>
          </Link>
          <button>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default BookmarkSpotsView;
