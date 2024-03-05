import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotsThunk } from "../../redux/spots";
import SpotSimpleView from "../SpotSimpleView/SpotSimpleView";
import "./SplashPage.css"
const SplashPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots?.allSpots);
  // console.log(spots)
  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);

  return (
    <div className="content-container">
      <h1>All Places</h1>
      <div className="spots-container">
        {spots?.map((spot) => (
          <div key={spot.id} className="spots-container-div">
            <SpotSimpleView spot={spot} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default SplashPage;
