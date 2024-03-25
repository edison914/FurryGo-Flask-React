import { useDispatch } from "react-redux";
import { useState } from "react";
import "./EditABookmarkModal.css";
import { useModal } from "../../context/Modal";
import { editBookmarkThunk } from "../../redux/bookmarks";
import "./EditABookmarkModal.css"

const EditABookmarkModal = ({ bookmark }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState(bookmark?.name);

  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    setHasSubmitted(true);

    setValidationErrors({});

    const formData = new FormData();
    formData.append("name", name);

    const res = await dispatch(editBookmarkThunk(formData, bookmark.id));

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
    <div className="edit-bookmark-form modalContainer">
      <form onSubmit={handleSubmit} className="edit-bookmark-formContainer">
        <h2>Edit {bookmark?.name}</h2>
        <label>
          Name{" "}
          <input
            type="text"
            placeholder="name"
            className="edit-bookmark-name-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value), (validationErrors.name = "");
            }}
          />
        </label>
        {validationErrors && hasSubmitted && (
          <p className="error">{validationErrors.name}</p>
        )}
        <div className="edit-bookmark-button-wrapper">
          <button
            className="edit-bookmark-button"
            type="button"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            Submit
          </button>

          <button
            type="button"
            className="edit-bookmark-button"
            onClick={handleCancelSubmit}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditABookmarkModal;
