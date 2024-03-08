import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "./NewRatingModal.css";
import { useModal } from "../../context/Modal";
import { getSpotsThunk } from "../../redux/spots";

const NewRatingModal = ({ spotId, currentUser, currentSpot }) => {
  const currentRating = currentSpot.ratings.filter(
    (rating) => rating?.user_id == currentUser?.id
  );
  const currentRatingNum = currentRating[0]?.bone_rating;
  const currentRatingId = currentRating[0]?.id;

  console.log(`currentRatingNum`, currentRatingNum);

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [rating, setRating] = useState(0);
  const [activeRating, setActiveRating] = useState(currentRatingNum);

  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (rating !== 0) {
      setActiveRating(rating);
    }
  }, [rating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    setHasSubmitted(true);

    setValidationErrors({});

    const formData = new FormData();
    formData.append("bone_rating", rating);
    //check to see if there is already a rating for the spot by currentUser
    //if no, create the rating by call the postRatingThunk
    if (!currentRatingNum) {
      // const res = await dispatch(postRatingThunk(formData, spotId));
      await fetch(`/api/spots/${spotId}/ratings`, {
        method: "POST",
        body: formData,
      });

      dispatch(getSpotsThunk());
      setHasSubmitted(false);
      setIsButtonDisabled(false);
      closeModal();

      //if yes, there is already a rating, call the updateRatingThunk
    } else {
      await fetch(`/api/ratings/${currentRatingId}`, {
        method: "PUT",
        body: formData,
      });
      dispatch(getSpotsThunk());
      setHasSubmitted(false);
      setIsButtonDisabled(false);
      closeModal();
    }
  };

  const handleCancelSubmit = () => {
    closeModal();
  };

  const handleRemoveSubmit = async () => {
    await fetch(`/api/ratings/${currentRatingId}`, {
      method: "DELETE",
    });

    dispatch(getSpotsThunk());
    setHasSubmitted(false);
    setIsButtonDisabled(false);
    closeModal();
  };

  console.log(`rating`, rating);
  console.log(`active rating`, activeRating);

  return (
    <div className="rating-form modalContainer">
      <h1>Rate {currentSpot?.name}</h1>
      <form onSubmit={handleSubmit}>
        <div className="rating-input">
          <div className="rating-input-name">Your Bone Rating:</div>
          <div
            className={activeRating > 0 ? `filled` : `empty`}
            onMouseEnter={() => setActiveRating(1)}
            onMouseLeave={() => setActiveRating(rating)}
            onClick={() => setRating(1)}
          >
            <i className="fa-solid fa-bone"></i>
          </div>
          <div
            className={activeRating > 1 ? `filled` : `empty`}
            onMouseEnter={() => setActiveRating(2)}
            onMouseLeave={() => setActiveRating(rating)}
            onClick={() => setRating(2)}
          >
            <i className="fa-solid fa-bone"></i>
          </div>
          <div
            className={activeRating > 2 ? `filled` : `empty`}
            onMouseEnter={() => setActiveRating(3)}
            onMouseLeave={() => setActiveRating(rating)}
            onClick={() => setRating(3)}
          >
            <i className="fa-solid fa-bone"></i>
          </div>
          <div
            className={activeRating > 3 ? `filled` : `empty`}
            onMouseEnter={() => setActiveRating(4)}
            onMouseLeave={() => setActiveRating(rating)}
            onClick={() => setRating(4)}
          >
            <i className="fa-solid fa-bone"></i>
          </div>
          <div
            className={activeRating > 4 ? `filled` : `empty`}
            onMouseEnter={() => setActiveRating(5)}
            onMouseLeave={() => setActiveRating(rating)}
            onClick={() => setRating(5)}
          >
            <i className="fa-solid fa-bone"></i>
          </div>
        </div>

        {validationErrors.bone_rating && hasSubmitted && (
          <p className="error">{validationErrors.bone_rating}</p>
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

        {currentRatingNum && (
          <button
            type="button"
            className="remove-button"
            onClick={handleRemoveSubmit}
          >
            Remove Your Rating
          </button>
        )}
      </form>
    </div>
  );
};

export default NewRatingModal;
