import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getCommentsThunk } from "../../redux/comments";
import "./CommentsBySpot.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import DeleteAComment from "../DeleteACommentModal/DeleteACommentModal"


const CommentsBySpot = () => {
  const { spotId } = useParams();
  const allComments = useSelector((state) => state.comments.allComments);
  const currentUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.byId[spotId]);
  const dispatch = useDispatch();
  console.log(allComments);
  useEffect(() => {
    dispatch(getCommentsThunk(spotId));
  }, [dispatch, spotId]);

  if (!allComments) return <div>Loading...</div>;

  if (allComments.length === 0) {
    return (
      <div>
        <div>Be the first to post a comment!</div>
      </div>
    );
  }
  return (
    <div className="commentsContainer">
      {allComments?.map((comment) => (
        <div key={comment.id} className="commentViewContainer">
          <div>
            <div>{comment.user_nickname} says:</div>
            <div className="commentText">{comment.comment_text}</div>
            {currentUser && (currentUser.id === comment.user_id) && (
                        <div className="commentButtonContainer">
                            <div className="commentDeleteButton">
                                <OpenModalButton
                                modalComponent={<DeleteAComment commentId={comment.id}/>}
                                buttonText='Delete'
                                />
                            </div>

                        </div>)}
          </div>

          {comment.image_url !== null && (<div>
            <div>Comment picture:</div>
             <NavLink to={comment.image_url} target="_blank">
              <img
                src={comment.image_url}
                alt={comment.id}
                className="commentPicture"
              />
            </NavLink>
          </div>)}

        </div>
      ))}
    </div>
  );
};

export default CommentsBySpot;
