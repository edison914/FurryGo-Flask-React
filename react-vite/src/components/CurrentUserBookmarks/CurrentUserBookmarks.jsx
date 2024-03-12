import { useDispatch, useSelector } from "react-redux";
import "./CurrentUserBookmarks.css";
import { useEffect } from "react";
import { getBookmarksThunk } from "../../redux/bookmarks";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import EditABookmarkModal from "../EditABookmarkModal/EditABookmarkModal";
import DeleteABookmarkModal from "../DeleteABookmarkModal/DeleteABookmarkModal";
import NewBookmarkModal from "../NewBookmarkModal/NewBookmarkModal";

export const BookmarksPage = () => {
  const currentUser = useSelector((state) => state.session.user);
  const bookmarks = useSelector((state) => state.bookmarks?.allBookmarks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmarksThunk());
  }, [dispatch, currentUser]);

  if (!currentUser)
    return (
      <div className="content-container">
        <h2>Forgot to sign in?</h2>
        <OpenModalButton
          modalComponent={<LoginFormModal />}
          buttonText="Sign in now"
        />
      </div>
    );

  if (bookmarks?.length === 0) {
    return (
      <div className="content-container">
        <div>You have no bookmark. Create one!</div>
        <div className="new-bookmark-button">
                <OpenModalButton
                  modalComponent={<NewBookmarkModal/>}
                  buttonText="Create New Bookmark"
                ></OpenModalButton>
              </div>
      <div className="bookmark"></div>
      </div>
    );
  }

  return (
    <div className="content-container">
      <div className="new-bookmark-button">
                <OpenModalButton
                  modalComponent={<NewBookmarkModal/>}
                  buttonText="Create New Bookmark"
                ></OpenModalButton>
              </div>
      <div className="bookmark">
        {bookmarks?.map((bookmark) => (
          <div key={bookmark.id} className="bookmark-view-container">
            <h3 className="bookmark-name">{bookmark.name}</h3>
            <div className="edit-bookmark-button-wrapper">
              <div className="edit-bookmark-button">
                <OpenModalButton
                  modalComponent={<EditABookmarkModal bookmark={bookmark} />}
                  buttonText="Edit Name"
                ></OpenModalButton>
              </div>
              <div className="edit-bookmark-button">
                <OpenModalButton
                  modalComponent={<EditABookmarkModal bookmark={bookmark} />}
                  buttonText="Edit Bookmark"
                ></OpenModalButton>
              </div>
              <div className="delete-bookmark-button">
                <OpenModalButton
                  modalComponent={<DeleteABookmarkModal bookmark={bookmark} />}
                  buttonText="Delete"
                ></OpenModalButton>
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};
