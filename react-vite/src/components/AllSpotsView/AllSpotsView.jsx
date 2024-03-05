import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotsThunk } from "../../redux/spots";
import SpotSimpleView from "../SpotSimpleView/SpotSimpleView";
import "./SplashPage.css"
const AllSpotsView = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots?.allSpots);
  // console.log(spots)
  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);

  return (
    <div>
      <h2>All Places</h2>
      <div className="Spots-container">
        {spots?.map((spot) => (
          <div key={spot.id} className="Spots-container-div">
            <SpotSimpleView spot={spot} />
          </div>
        ))}
      </div>
      <footer className="splash-page-footer">
        <p>©2024 Developed by Eddie Ding for educational purpose.</p>
        <div>
          <a
            href="https://github.com/edison914"
            target="_blank"
            rel="noreferrer"
          >
            Eddie&apos;s Github
          </a>
        </div>
      </footer>
    </div>
  );
};

export default AllSpotsView;
