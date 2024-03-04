import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserSpotsThunk } from "../../redux/spots";
import SpotSimpleView from "../SpotSimpleView/SpotSimpleView";
import DeleteASpot from "../DeleteASpotModal/DeleteASpotModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { NavLink} from "react-router-dom";
import LoginFormModal from "../LoginFormModal/LoginFormModal";

const CurrentUserSpots = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session?.user?.id);
  const spots = useSelector((state) => state.spots?.allSpots);


  // console.log(userId)
  useEffect(() => {
    dispatch(getCurrentUserSpotsThunk(userId));
  }, [dispatch, userId]);

  if (!spots.length) return (
    <div>
    <h1>You do not have any place. Create one now!</h1>
<button>
  <NavLink to="/spots/new">Create a new place</NavLink>
</button>
</div>
  )


    if (!userId) return (
      <div>
        <h2>Forgot to sign in</h2>
         <OpenModalButton
          modalComponent={<LoginFormModal/>}
          buttonText="Sign in here"
        />
      </div>

    );

  return (
    <div>
      <h1>My Places</h1>
      <div className="SpotsContainer">
        {spots?.map((spot) => (
          <div key={spot.id} className="SpotsContainerDiv">
            <SpotSimpleView spot={spot} />

            {userId && userId === spot.user_id && (
              <div className="SpotDeleteButtonContainer">
                <div className="SpotDeleteButton">
                  <OpenModalButton
                    modalComponent={<DeleteASpot spotId={spot.id} />}
                    buttonText="Delete a place"
                  />
                </div>
              </div>
            )}

            {userId && userId === spot.user_id && (
              <div className="SpotEditButtonContainer">
                <div className="SpotEditButton">
                  <button>
                    <NavLink to={`/spots/${spot.id}/edit`}>
                        Edit a place
                    </NavLink>
                  </button>
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
