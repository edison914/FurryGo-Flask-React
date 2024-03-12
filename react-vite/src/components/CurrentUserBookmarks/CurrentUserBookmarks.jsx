import { useDispatch, useSelector } from "react-redux";
import "./CurrentUserBookmarks.css";
import { useEffect, useState } from "react";
import { getBookmarksThunk } from "../../redux/bookmarks";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import EditABookmarkModal from "../EditABookmarkModal/EditABookmarkModal";
import DeleteABookmarkModal from "../DeleteABookmarkModal/DeleteABookmarkModal";
import NewBookmarkModal from "../NewBookmarkModal/NewBookmarkModal";
import BookmarkSpotsView from "../BookmarkSpotsView/BookmarkSpotsView";

export const BookmarksPage = () => {
  const currentUser = useSelector((state) => state.session.user);
  const bookmarks = useSelector((state) => state.bookmarks?.allBookmarks);
  bookmarks.sort((a, b) => {
    const dateA = new Date(a.updated_at);
    const dateB = new Date(b.updated_at);
    return dateB - dateA;
  });

  // const defaultId = bookmarks?[0].id
  const [bookmarkSelectedName, SetBookmarkSelectedName] = useState(null);
  const [bookmarkSelectedId, SetBookmarkSelectedId] = useState(null);

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
            modalComponent={<NewBookmarkModal />}
            buttonText="Create New Bookmark"
          ></OpenModalButton>
        </div>
        <div className="bookmark"></div>
      </div>
    );
  }

  return (
    <div className="bookmark-outer-container">
      <div className="new-bookmark-wrapper">
        <h3>Need to create a new bookmark?</h3>
        <div className="new-bookmark-button">
          <OpenModalButton
            modalComponent={<NewBookmarkModal />}
            buttonText="Click Here"
          ></OpenModalButton>
        </div>
      </div>

      <div className="bookmark-container">
        <div className="bookmark-left-container">
          {bookmarks?.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bookmark-view-container"
              onClick={() => {
                SetBookmarkSelectedId(bookmark.id),
                  SetBookmarkSelectedName(bookmark.name);
              }}
            >
              <h3 className="bookmark-name">{bookmark.name}</h3>

              <div className="edit-bookmark-button-wrapper">
                <div className="edit-bookmark-button">
                  <OpenModalButton
                    modalComponent={<EditABookmarkModal bookmark={bookmark} />}
                    buttonText="Edit Name"
                  ></OpenModalButton>
                </div>

                <div className="delete-bookmark-button">
                  <OpenModalButton
                    modalComponent={
                      <DeleteABookmarkModal bookmark={bookmark} />
                    }
                    buttonText="Delete"
                  ></OpenModalButton>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bookmark-right-container">
          {bookmarkSelectedId ? (
            <div>
              <BookmarkSpotsView
                bookmarkId={bookmarkSelectedId}
                bookmarkName={bookmarkSelectedName}
              />
            </div>
          ) : (
            <h3>Select a bookmark to see the detail</h3>
          )}
        </div>
      </div>
    </div>
  );
};
