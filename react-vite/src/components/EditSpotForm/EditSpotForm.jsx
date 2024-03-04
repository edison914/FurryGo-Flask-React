import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editSpotThunk, getCurrentUserSpotsThunk } from "../../redux/spots";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";

const EditSpotForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);
  // console.log(`spotId`, spotId)
  const spot = useSelector((state) => state.spots.byId[spotId]);
  // console.log(`spot`, spot )
  const user = useSelector((state) => state.session.user);
  const userId = user.Id;

  useEffect(() => {
    dispatch(getCurrentUserSpotsThunk(userId));
  }, [dispatch, userId]);

  const [name, setName] = useState(spot?.name);
  const [category, setCategory] = useState(spot?.category);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [zipcode, setZipcode] = useState(spot?.zip_code);
  const [lat, setLat] = useState(spot?.lat);
  const [lng, setLng] = useState(spot?.lng);
  const [description, setDescription] = useState(spot?.description);
  const [website, setWebsite] = useState(spot?.website);
  const [phoneNumber, setPhoneNumber] = useState(spot?.phone_number);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");

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
    formData.append("category", category);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zip_code", zipcode);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("description", description);
    formData.append("website", website);
    formData.append("phone_number", phoneNumber);
    formData.append("image_url1", image1);
    formData.append("image_url2", image2);

    const res = await dispatch(editSpotThunk(formData, spotId));
    console.log(`what is the res`, res);
    if (!res.id) {
      setValidationErrors(res);
      setIsButtonDisabled(false);
      console.log(res);
    } else {
      navigate(`/spots/${res.id}`);
    }
  };

  const handleCancelSubmit = () => {
    navigate(`/spots/current`);
  };


  if (!userId)
    return (
      <div>
        <h1>Forgot to sign in</h1>
        <OpenModalButton
          modalComponent={<LoginFormModal />}
          buttonText="Sign in here"
        />
      </div>
    );


  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="formContainer"
        encType="multipart/form-data"
      >
        <h1>Edit {spot ? spot.name : `Spot`}</h1>
        <label>
          Place Name
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {validationErrors.name && hasSubmitted && (
            <p className="error">{validationErrors.name}</p>
          )}
        </label>

        <label>
          Choose A Category
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">--Please choose an option--</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Cafes">Cafes</option>
            <option value="Parks">Parks</option>
            <option value="Events">Events</option>
            <option value="Hotels">Hotels</option>
            <option value="Shops">Shops</option>
          </select>
          {validationErrors.category && hasSubmitted && (
            <p className="error">{validationErrors.category}</p>
          )}
        </label>

        <label>
          Address
          <input
            type="text"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {validationErrors.address && hasSubmitted && (
            <p className="error">{validationErrors.address}</p>
          )}
        </label>

        <label>
          City
          <input
            type="text"
            placeholder="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {validationErrors.city && hasSubmitted && (
            <p className="error">{validationErrors.city}</p>
          )}
        </label>

        <label>
          State
          <input
            type="text"
            placeholder="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          {validationErrors.state && hasSubmitted && (
            <p className="error">{validationErrors.state}</p>
          )}
        </label>

        <label>
          Zip Code
          <input
            type="text"
            placeholder="zip code"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
          {validationErrors.zip_code && hasSubmitted && (
            <p className="error">{validationErrors.zip_code}</p>
          )}
        </label>

        <label>
          Lat
          <input
            type="text"
            placeholder="lat"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          {validationErrors.lat && hasSubmitted && (
            <p className="error">{validationErrors.lat}</p>
          )}
        </label>

        <label>
          Lng
          <input
            type="text"
            placeholder="lng"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
          {validationErrors.lng && hasSubmitted && (
            <p className="error">{validationErrors.lng}</p>
          )}
        </label>

        <label>
          Description
          <textarea
            name="description"
            rows="5"
            placeholder="Write the place detail here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {validationErrors.description && hasSubmitted && (
            <p className="error">{validationErrors.description}</p>
          )}
        </label>

        <label>
          Website
          <input
            type="text"
            placeholder="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          {validationErrors.website && hasSubmitted && (
            <p className="error">{validationErrors.website}</p>
          )}
        </label>

        <label>
          Phone
          <input
            type="text"
            placeholder="phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {validationErrors.phone_number && hasSubmitted && (
            <p className="error">{validationErrors.phone_number}</p>
          )}
        </label>

        <label>
          Edit an image 1
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage1(e.target.files[0])}
          />
          {validationErrors.image_url1 && hasSubmitted && (
            <p className="error">{validationErrors.image_url1}</p>
          )}
        </label>

        <label>
          Edit an image 2
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage2(e.target.files[0])}
          />
          {validationErrors.image_url2 && hasSubmitted && (
            <p className="error">{validationErrors.image_url2}</p>
          )}
        </label>

        <button
          type="submit"
          className="newSpotSubmitButton"
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
    </div>
  );
};

export default EditSpotForm;
