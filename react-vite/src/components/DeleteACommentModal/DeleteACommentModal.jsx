import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteACommentModal.css";
import { deleteCommentThunk } from "../../redux/comments";

const DeleteAComment = ({ commentId }) => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(deleteCommentThunk(commentId))
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
    <div className="deleteComment modalContainer">
      <h1>Confirm Delete</h1>

      {errors.message && <p className="">{errors.message}</p>}

      <p>Are you sure you want to remove this comment?</p>

      <button
        className="deleteCommentYes button"
        type="button"
        onClick={handleConfirmSubmit}
      >
        Yes
      </button>

      <button
        className="deleteCommentNo button"
        type="button"
        onClick={handleCancelSubmit}
      >
        No
      </button>
    </div>
  );
}

export default DeleteAComment;
