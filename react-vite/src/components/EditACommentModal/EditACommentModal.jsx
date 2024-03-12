import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./EditACommentModal.css";
import { editCommentThunk } from "../../redux/comments";
import { useModal } from "../../context/Modal";

const EditACommentModal = ({ spot, commentId }) => {
  const spotId = Number(spot.id);
  const currentComment = useSelector((state) => state.comments.byId[commentId]);

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [comment, setComment] = useState(currentComment.comment_text);
  const [image, setImage] = useState("");

  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    setHasSubmitted(true);

    setValidationErrors({});

    const formData = new FormData();
    formData.append("comment_text", comment);
    formData.append("image_url", image);

    const res = await dispatch(editCommentThunk(formData, commentId, spotId));

    if (!res.id) {
      setValidationErrors(res);
      setIsButtonDisabled(false);
    } else {
      setHasSubmitted(false);
      setIsButtonDisabled(false);
      closeModal();
    }
  };

  const handleCancelSubmit = () => {
    closeModal();
  };

  return (
    <div className="comment-form modalContainer">
      <h2>Edit your comment</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <textarea
          className="post-comment-text-area-input"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value), (validationErrors.comment_text = "");
          }}
          name="comment"
          placeholder="Write a comment"
          rows="5"
        ></textarea>
        {validationErrors && (
          <p className="error">{validationErrors.comment_text}</p>
        )}
        <label className="label-upload">
          Optional: upload image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]), (validationErrors.image_url = "");
            }}
          />
        </label>
        {validationErrors.image_url && hasSubmitted && (
          <p className="error">{validationErrors.image_url}</p>
        )}
        <div className="edit-comment-button-wrapper">
          <button
            className="submit-button"
            type="button"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            Submit
          </button>

          <button
            type="button"
            className="cancel-button"
            onClick={handleCancelSubmit}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditACommentModal;
