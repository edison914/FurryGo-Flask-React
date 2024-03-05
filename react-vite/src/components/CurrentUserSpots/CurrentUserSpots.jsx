import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserSpotsThunk } from "../../redux/spots";
import SpotSimpleView from "../SpotSimpleView/SpotSimpleView";
import DeleteASpot from "../DeleteASpotModal/DeleteASpotModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import "./CurrentUserSpots.css"

const CurrentUserSpots = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session?.user?.id);
  const spots = useSelector((state) => state.spots?.allSpots);

  // console.log(userId)
  useEffect(() => {
    dispatch(getCurrentUserSpotsThunk(userId));
  }, [dispatch, userId]);

  if (!spots.length)
    return (
      <div className="content-container">
        <h1>You do not have any place. Create one now!</h1>
        <button>
          <NavLink to="/spots/new">Create a new place</NavLink>
        </button>
      </div>
    );

  if (!userId)
    return (
      <div className="content-container">
        <h1>Forgot to sign in</h1>
        <OpenModalButton
          modalComponent={<LoginFormModal />}
          buttonText="Sign in here"
        />
      </div>
    );

  return (
    <div className="content-container">
      <h1>My Places</h1>
      <div className="spots-container">
        {spots?.map((spot) => (
          <div key={spot.id} className="spots-container-div">
            <SpotSimpleView spot={spot} />

            {userId && userId === spot.user_id && (
              <div className="spot-buttonContainer">
                <div className="spot-delete-button">
                  <OpenModalButton
                    modalComponent={<DeleteASpot spotId={spot.id} />}
                    buttonText="Delete a place"
                  />
                </div>

                <div className="spot-edit-button">
                  <button>
                    <NavLink className="spot-edit-navlink" to={`/spots/${spot.id}/edit`}>
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
