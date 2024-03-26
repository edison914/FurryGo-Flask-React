import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./AddToBookmarkModal.css";
import {
  getBookmarksThunk,
  postAPlaceToBookmarkThunk,
} from "../../redux/bookmarks";

export const AddToBookmarkModal = ({ spotId }) => {
  const dispatch = useDispatch();

  const bookmarks = useSelector((state) => state.bookmarks?.allBookmarks);
  bookmarks.sort((a, b) => {
    const dateA = new Date(a.updated_at);
    const dateB = new Date(b.updated_at);
    return dateB - dateA;
  });
  // console.log(bookmarks);

  const [validationErrors, setValidationErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(getBookmarksThunk());
  }, [dispatch]);

  const handleAddSubmit = async (bookmarkId) => {
    // e.preventDefault();
    setValidationErrors({});
    const res = await dispatch(postAPlaceToBookmarkThunk(bookmarkId, spotId));
    // console.log(res);
    if (res.error) {
      alert(`Error: Place is already in bookmark`);
    } else {
      alert(`successfully added to the bookmark`);
      closeModal();
    }
  };
  const handleCancelSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  // const handleSelectedBookmark = (bookmarkId) => {
  //   setSelectedBookmarksId((prevBookmarkId) => {
  //     //check to see if selected id is already in the array
  //     const alreadySelected = prevBookmarkId.includes(bookmarkId);

  //     //if yes, its already in the array
  //     if (alreadySelected) {
  //       //remove it from the array because of your check
  //       return prevBookmarkId.filter((id) => id !== bookmarkId);
  //     } else {
  //       //if no, add the bookmarkId to the array
  //       return [...prevBookmarkId, bookmarkId];
  //     }
  //   });
  // };

  // console.log(selectedBookmarksId);

  return (
    <div className="add-bookmark-place modalContainer">
      <h2>Add to Bookmark</h2>
      {bookmarks ? (
        bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="add-to-bookmark-container">
            <label>
              {/* <input
                type="checkbox"
                name={bookmark.name}
                value={bookmark.id}
                onChange={() => handleSelectedBookmark(bookmark.id)}
              /> */}
              {bookmark.name}
            </label>
            <button
              className="add-button"
              type="button"
              onClick={() => {
                handleAddSubmit(bookmark.id);
              }}
            >
              Add
            </button>
            {validationErrors.error && (
              <p className="">{validationErrors.error}</p>
            )}
          </div>
        ))
      ) : (
        <div>You do not have a bookmark. Create one.</div>
      )}

      <div className="add-bookmark-place-button-wrapper">
        <button
          className="cancel-button"
          type="button"
          onClick={handleCancelSubmit}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
