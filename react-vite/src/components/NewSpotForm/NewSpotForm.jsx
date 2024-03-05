import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSpotThunk } from "../../redux/spots";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import "./NewSpotForm.css";
const NewSpotForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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

    const res = await dispatch(createSpotThunk(formData));
    // console.log(`what is the res`, res)
    if (!res.id) {
      setValidationErrors(res);

      setIsButtonDisabled(false);
      // console.log(res)
    } else {
      navigate(`/spots/${res.id}`);
    }
  };

  const handleCancelSubmit = () => {
    navigate(`/`);
  };

  if (!user)
    return (
      <div className="content-container">
        <h2>Forgot to sign in</h2>
        <OpenModalButton
          modalComponent={<LoginFormModal />}
          buttonText="Sign in here"
        />
      </div>
    );

  return (
    <div className="content-container">
      <form
        onSubmit={handleSubmit}
        className="formContainer"
        encType="multipart/form-data"
      >
        <h2>Create a new Place</h2>
        <div className="form-subcontainer">
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
              className="category"
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
        </div>
        <div className="form-subcontainer">
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
        </div>

        <div className="form-subcontainer">
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
        </div>

        <div className="form-subcontainer">
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
        </div>


        <label className="form-textarea-container">
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
        <div className="form-subcontainer">
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

        </div>

        <label className="label-upload">
          Upload Image 1:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage1(e.target.files[0])}
          />
          {validationErrors.image_url1 && hasSubmitted && (
            <p className="error">{validationErrors.image_url1}</p>
          )}
        </label>

        <label className="label-upload">
          Upload Image2:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage2(e.target.files[0])}
          />
          {validationErrors.image_url2 && hasSubmitted && (
            <p className="error">{validationErrors.image_url2}</p>
          )}
        </label>

        <div className="form-subcontainer">
          <button
            type="submit"
            className="new-form-submit submit-button"
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

export default NewSpotForm;
