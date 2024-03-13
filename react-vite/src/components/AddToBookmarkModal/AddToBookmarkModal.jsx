import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./AddToBookmarkModal.css";
import { removeSpotThunk } from "../../redux/spots";
import { deleteAPlaceFromBookmarkThunk } from "../../redux/bookmarks";

export const AddToBookmarkModal = ({ spotId }) => {
  const dispatch = useDispatch();

  const bookmarks = useSelector((state) => state.bookmarks?.allBookmarks);
  bookmarks.sort((a, b) => {
    const dateA = new Date(a.updated_at);
    const dateB = new Date(b.updated_at);
    return dateB - dateA;
  });

  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(deleteAPlaceFromBookmarkThunk(bookmarkId, spotId))
      .then(closeModal)
      .catch(async (res) => {
        //const data = await res.json();
        if (res && res.message) {
          setErrors(res);
        }
      });
  };
  const handleCancelSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="add-bookmark-place modalContainer">
      <h2>Add to Bookmark</h2>
      {bookmarks ? (
        bookmarks.map((bookmark) => (
          <div key={bookmark.id}>
            <label>
              <input type="checkbox" name={bookmark.name} onChange/>
              {bookmark.name}
            </label>
          </div>
        ))
      ) : (
        <div>You do not have a bookmark</div>
      )}
      {errors.message && <p className="">{errors.message}</p>}
      <div className="add-bookmark-place-button-wrapper">
        <button
          className="delete-button"
          type="button"
          onClick={handleConfirmSubmit}
        >
          Yes
        </button>

        <button
          className="cancel-button"
          type="button"
          onClick={handleCancelSubmit}
        >
          No
        </button>
      </div>
    </div>
  );
};
