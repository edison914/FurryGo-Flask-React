import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteABookmarkModal.css";
import { deleteBookmarkThunk } from "../../redux/bookmarks";

const DeleteABookmarkModal = ({ bookmark }) => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(deleteBookmarkThunk(bookmark.id))
      .then(closeModal)
      .catch(async (res) => {
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
    <div className="delete-bookmark modalContainer">
      <h2>Confirm Delete</h2>

      {errors.message && <p className="">{errors.message}</p>}

      <p>Are you sure you want to remove this bookmark?</p>
      <div className="delete-comment-button-wrapper">
        <button
          className="delete-button"
          type="button"
          onClick={handleConfirmSubmit}
        >
          Yes
        </button>

        <button
          className="delete-cancel-button"
          type="button"
          onClick={handleCancelSubmit}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteABookmarkModal;
