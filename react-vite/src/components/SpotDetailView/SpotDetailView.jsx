import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./SpotDetailView.css";
import { getSpotsThunk } from "../../redux/spots";
import CommentsBySpot from "../CommentsBySpot/CommentsBySpot";
import NewCommentModal from "../NewCommentModal/NewCommentModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";


const SpotDetailView = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const currentSpot = useSelector((state) => state.spots.byId[spotId]);

  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);

  // console.log(`currentSpot`, currentSpot);

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

      <h3>{currentSpot?.category}</h3>
      <h3>{currentSpot?.name}</h3>
      <div className="newCommentModalContainer">
        <OpenModalButton
          modalComponent={<NewCommentModal spot={currentSpot} />}
          buttonText="Add Your Comment"
        />
      </div>

      <div>
        {currentSpot?.city}, {currentSpot?.state}
      </div>
      <div>{currentSpot?.description}</div>
      <div>
        <CommentsBySpot />
      </div>
    </div>
  );
};

export default SpotDetailView;
