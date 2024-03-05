import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal"
import './DeleteASpotModal.css'
import { removeSpotThunk } from '../../redux/spots';

const DeleteASpot = ({spotId}) => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const handleConfirmSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        return dispatch(removeSpotThunk(spotId))

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
        <div className='deleteSpot modalContainer'>
            <h1>Confirm Delete</h1>

            {errors.message && (
                <p className=''>{errors.message}</p>
            )}

            <p>
                Are you sure you want to remove this place?
            </p>

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
    )
}

export default DeleteASpot
