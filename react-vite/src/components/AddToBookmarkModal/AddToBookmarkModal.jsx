import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal"
import './AddToBookmarkModal.css'
import { removeSpotThunk } from '../../redux/spots';

export const AddToBookmarkModal = () => {
  const dispatch = useDispatch();

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
      closeModal()
  };

  return (
      <div className='add-bookmark-place modalContainer'>
          <h2>Add to Bookmark</h2>

          {errors.message && (
              <p className=''>{errors.message}</p>
          )}
          <div className='add-bookmark-place-button-wrapper'>
          <button
              className='delete-button'
              type='button'
              onClick={handleConfirmSubmit}
          >
              Yes
          </button>

          <button
              className='cancel-button'
              type='button'
              onClick={handleCancelSubmit}
          >
              No
          </button>
          </div>


      </div>
  )
};
