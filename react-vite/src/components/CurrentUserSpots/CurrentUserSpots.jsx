import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserSpotsThunk } from "../../redux/spots";
import SpotSimpleView from "../SpotSimpleView/SpotSimpleView";
import DeleteASpot from "../DeleteASpotModal/DeleteASpotModal";
import OpenModalButton from '../OpenModalButton/OpenModalButton';


const CurrentUserSpots = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session?.user?.id);
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

            {userId && userId === spot.user_id && (
              <div className="comment-button-container">
                <div className="comment-delete-button">
                  <OpenModalButton
                    modalComponent={<DeleteASpot spotId={spot.id} />}
                    buttonText="Delete"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentUserSpots;
