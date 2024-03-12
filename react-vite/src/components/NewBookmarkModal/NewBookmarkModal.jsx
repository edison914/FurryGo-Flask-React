import { useDispatch } from "react-redux";
import { useState } from "react";
import "./NewBookmarkModal.css";
import { useModal } from "../../context/Modal";
import { postBookmarkThunk } from "../../redux/bookmarks";

const NewBookmarkModal = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [name, setName] = useState('');

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

      const res = await dispatch(postBookmarkThunk(formData));

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
      <div className="bookmark-form modalContainer">
        <form onSubmit={handleSubmit} className="formContainer">
          <h2>Create a new bookmark</h2>
          <label>
            Name{" "}
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value), (validationErrors.name = "");
              }}
            />
          </label>
          {validationErrors && hasSubmitted && (
            <p className="error">{validationErrors.name}</p>
          )}
          <div className="edit-button-wrapper">
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

export default NewBookmarkModal;
