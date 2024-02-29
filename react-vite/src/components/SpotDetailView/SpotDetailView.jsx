// import { useEffect } from "react"
import { useSelector } from "react-redux";
// import { getSpotsThunk } from "../../redux/spots"
import { useParams } from "react-router-dom";
import "./SpotDetailView.css";
const SpotDetailView = () => {
  // const dispatch = useDispatch()
  const { spotId } = useParams();
  const currentSpot = useSelector((state) => state.spots.byId[spotId]);

  console.log(`currentSpot`, currentSpot);

  return (
    <div>
      <div className="spotDetailViewPictureContainer">
        <img
          src={currentSpot?.spot_images[0].image_url}
          title={currentSpot?.name}
        ></img>
        <img
          src={currentSpot?.spot_images[1].image_url}
          title={currentSpot?.name}
        ></img>
      </div>

      <div>{currentSpot?.category.toUpperCase()}</div>
      <div>{currentSpot?.name}</div>
      <div>
        {currentSpot?.city}, {currentSpot?.state}
      </div>
      <div>{currentSpot?.description}</div>
    </div>
  );
};

export default SpotDetailView;
