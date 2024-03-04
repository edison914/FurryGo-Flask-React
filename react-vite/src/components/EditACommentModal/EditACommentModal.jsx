import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState} from "react";
import "./EditACommentModal.css";
import { editCommentThunk} from "../../redux/comments";
import { useModal } from "../../context/Modal";

const EditACommentModal = ({spot, commentId}) => {
  const spotId = Number(spot.id)
  const currentComment = useSelector((state) => state.comments.byId[commentId])

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
    <div>
      <form
        onSubmit={handleSubmit}
        className="formContainer"
        encType="multipart/form-data"
      >
        <h1>Edit your comment</h1>
        <textarea
          className="postCommentFormInput"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          name="comment"
          placeholder="Write a comment"
          rows="5"
        ></textarea>

        <label>
          Optional: upload image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {validationErrors.image_url && hasSubmitted && (
            <p className="error">{validationErrors.image_url}</p>
          )}
        </label>

        <button
          className="postCommentSubmitButton"
          type="button"
          onClick={handleSubmit}
          disabled={isButtonDisabled}
        >
          Submit
        </button>

        <button
          type="button"
          className="newSpotSubmitButton"
          onClick={handleCancelSubmit}
        >
          Cancel
        </button>
      </form>
      {validationErrors && (
        <p className="reviewFormError">{validationErrors.comment_text}</p>
      )}
    </div>
  );
};

export default EditACommentModal;
