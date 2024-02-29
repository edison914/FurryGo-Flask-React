import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewSpotForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
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


  };

  if (!user) return <h2 className="sign-in">Forgot to sign in?</h2>;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="formContainer"
        encType="multipart/form-data"
      >
        <h1>Create a new Place</h1>
        <label>
          {" "}
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

        <label>Choose A Category
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
      </form>
    </div>
  );
};

export default NewSpotForm;
