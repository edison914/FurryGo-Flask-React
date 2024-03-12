import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarkPlacesThunk } from "../../redux/bookmarks";
import "./BookmarkSpotsView.css";

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
          <img src={place.spot_images[0].image_url} />
          <div className="bookmark-place-text-rating">
            <div>{place.name}</div>
            <div>
              {place.city},{place.state}{" "}
            </div>
            <div>Average Rating: {place.average_rating}</div>

          </div>
          <button>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default BookmarkSpotsView;
