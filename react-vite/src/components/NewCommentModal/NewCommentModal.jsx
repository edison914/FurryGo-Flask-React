import { useDispatch } from "react-redux";
import { useState } from "react";
import "./NewCommentModal.css";
import { postCommentThunk } from "../../redux/comments";
import { useModal } from "../../context/Modal";

const NewCommentModal = ({ spot }) => {
  const spotId = Number(spot.id);
  // console.log(spotId);

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [comment, setComment] = useState("");
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

    const res = await dispatch(postCommentThunk(formData, spotId));

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
      <h1>Create a new comment</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <textarea
          className="post-comment-text-area-input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          name="comment"
          placeholder="Write a comment"
          rows="5"
        ></textarea>
        {validationErrors && (
          <p className="error">{validationErrors.comment_text}</p>
        )}
        <label className="label-upload">
          Optional Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        {validationErrors.image_url && hasSubmitted && (
          <p className="error">{validationErrors.image_url}</p>
        )}
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
      </form>
    </div>
  );
};

export default NewCommentModal;
