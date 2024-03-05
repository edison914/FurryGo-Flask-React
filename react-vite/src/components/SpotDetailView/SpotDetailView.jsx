import { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./SpotDetailView.css";
import { getSpotsThunk } from "../../redux/spots";
import CommentsBySpot from "../CommentsBySpot/CommentsBySpot";
import NewCommentModal from "../NewCommentModal/NewCommentModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import NotFoundPage from "../Navigation/NotFoundPage";

const SpotDetailView = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const currentSpot = useSelector((state) => state.spots.byId[spotId]);
  const currentUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getSpotsThunk());
    setIsLoaded(true)
  }, [dispatch]);

  if (!currentSpot && isLoaded) {
    return <NotFoundPage />
  }


  return (
    <div className="content-container">
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

      <h3>{currentSpot?.category}</h3>
      <h3>{currentSpot?.name}</h3>
      {currentUser ? (
        <div className="newCommentModalContainer">
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
      <div>Addresss: {currentSpot?.address}</div>
      <div>
        {currentSpot?.city}, {currentSpot?.state}
      </div>
      <div>Zipcode: {currentSpot?.zip_code}</div>
      <div>{currentSpot?.description}</div>
      <div>Website: {currentSpot?.website}</div>
      <div>Phone: {currentSpot?.phone_number}</div>
      {/* <div>Average Bone Rating: {currentSpot?.average_rating ? currentSpot.average_rating `Bones` : "No Rating Yet"}</div> */}

      <div>
        <CommentsBySpot />
      </div>
    </div>
  );
};

export default SpotDetailView;
