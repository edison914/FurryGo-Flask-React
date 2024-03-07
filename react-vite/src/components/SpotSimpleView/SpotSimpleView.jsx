import { NavLink } from "react-router-dom";
import "./SpotSimpleView.css";
const SpotSimpleView = (spot) => {
  const currentSpot = spot.spot;

  // console.log(`current spot`,currentSpot.category[0])

  return (
    <NavLink
      to={`/spots/${currentSpot.id}`}
      className="spot-simple-view-container"
    >
      <img
        src={currentSpot?.spot_images[0].image_url}
        title={currentSpot?.name}
      ></img>
      <div className="spot-simple-firstline-wrapper">
        <div>
          {currentSpot?.category[0].toUpperCase()}
          {currentSpot?.category.slice(1)}
        </div>
        <div>
          {currentSpot?.average_rating ? currentSpot.average_rating : 0} <i className="fa-solid fa-bone"></i>
        </div>
      </div>

      <div>{currentSpot?.name}</div>
      <div>
        {currentSpot?.city}, {currentSpot?.state}
      </div>
    </NavLink>
  );
};

export default SpotSimpleView;
