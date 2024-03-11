import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./SpotDetailView.css";
import { getSpotsThunk } from "../../redux/spots";
import CommentsBySpot from "../CommentsBySpot/CommentsBySpot";
import NewCommentModal from "../NewCommentModal/NewCommentModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import NotFoundPage from "../Navigation/NotFoundPage";
import NewRatingModal from "../NewRatingModal/NewRatingModal";
import { AddToBookMarkModal } from "../AddToBookmarkModal/AddToBOokmarkModal";

const SpotDetailView = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const currentSpot = useSelector((state) => state.spots.byId[spotId]);
  const currentUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getSpotsThunk());
    setIsLoaded(true);
  }, [dispatch]);

  if (!currentSpot && isLoaded) {
    return <NotFoundPage />;
  }

  return (
    <div className="content-container">
      <div className="spot-detail-wrapper">
        <div className="spot-detail-title-container">
          <h2>
            {currentSpot?.category} - {currentSpot?.name}
          </h2>
          <h2>
            Bone Rating:{" "}
            {currentSpot?.average_rating ? currentSpot.average_rating : 0}{" "}
            <i className="fa-solid fa-bone"></i>
          </h2>
        </div>

        <div className="spot-detail-picture-container">
          <img
            src={currentSpot?.spot_images[0].image_url}
            title={currentSpot?.name}
          ></img>
          <img
            src={currentSpot?.spot_images[1].image_url}
            title={currentSpot?.name}
          ></img>
        </div>
        <div className="spot-detail-container">
          <div className="spot-detail-context-container">
            <div>Addresss: {currentSpot?.address}</div>
            <div>
              {currentSpot?.city}, {currentSpot?.state}
            </div>
            <div>Zip Code: {currentSpot?.zip_code}</div>
            <div>Description: {currentSpot?.description}</div>
            <div>
              Website:{" "}
              <a href={currentSpot?.website} target="_blank" rel="noreferrer">
                {currentSpot?.website}
              </a>
            </div>
            <div>
              Phone:{" "}
              <a
                href={`tel:${currentSpot?.phone_number}`}
                target="_blank"
                rel="noreferrer"
              >
                {currentSpot?.phone_number}
              </a>
            </div>
          </div>
          <div className="spot-detail-buttons-container">
            {currentUser ? (
              <div className="new-comment-button-container">
                <OpenModalButton
                  modalComponent={<NewCommentModal spot={currentSpot} />}
                  buttonText="Add Your Comment"
                />
              </div>
            ) : (
              <OpenModalButton
                modalComponent={<LoginFormModal spot={currentSpot} />}
                buttonText="Add Your Comment"
              />
            )}

            {currentUser ? (
              currentUser?.id !== currentSpot?.user_id && (
                <div className="new-comment-button-container">
                  <OpenModalButton
                    modalComponent={
                      <NewRatingModal
                        spotId={spotId}
                        currentUser={currentUser}
                        currentSpot={currentSpot}
                      />
                    }
                    buttonText="Rate the place"
                  />
                </div>
              )
            ) : (
              <OpenModalButton
                modalComponent={<LoginFormModal spot={currentSpot} />}
                buttonText="Rate the place"
              />
            )}
            need to revise the following to add to bookmark
            {currentUser ? (
              <div className="new-comment-button-container">
                <OpenModalButton
                  modalComponent={
                    <AddToBookMarkModal
                      spotId={spotId}
                      currentUser={currentUser}
                      currentSpot={currentSpot}
                    />
                  }
                  buttonText="Bookmark the place"
                />
              </div>
            ) : (
              <OpenModalButton
                modalComponent={<LoginFormModal spot={currentSpot} />}
                buttonText="Bookmark the place"
              />
            )}
          </div>
        </div>

        {/* <div>Average Bone Rating: {currentSpot?.average_rating ? currentSpot.average_rating `Bones` : "No Rating Yet"}</div> */}

        <div className="spot-detail-bottom-half-container">
          {/* <div className="commentsContainer"> */}
          <CommentsBySpot />
          {/* </div> */}

          <div className="mapContainer"></div>
        </div>
      </div>
    </div>
  );
};

export default SpotDetailView;
