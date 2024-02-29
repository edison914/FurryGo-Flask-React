import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserSpotsThunk} from "../../redux/spots";
import SpotSimpleView from "../SpotSimpleView/SpotSimpleView";

const CurrentUserSpots = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session?.user?.id)
  const spots = useSelector((state) => state.spots?.allSpots);
  // console.log(userId)
  useEffect(() => {
    dispatch(getCurrentUserSpotsThunk(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <h1>My Places</h1>
      <div className="SpotsContainer">
        {spots?.map((spot) => (
          <div key={spot.id} className="SpotsContainerDiv">
            <SpotSimpleView spot={spot} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentUserSpots;
