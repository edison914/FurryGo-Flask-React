//action types
const GET_ALL_BOOKMARKS_BY_USER_ID = "bookmarks/GET_ALL_BOOKMARKS_BY_USER_ID";
const POST_BOOKMARK = "bookmarks/POST_BOOKMARK";
const EDIT_BOOKMARK = "bookmarks/EDIT_BOOKMARK";
const REMOVE_BOOKMARK = "bookmarks/REMOVE_BOOKMARK";

const GET_ALL_PLACES_BY_BOOKMARK_ID = "bookmarks/GET_ALL_PLACES_BY_BOOKMARK_ID";
const REMOVE_A_PLACE_FROM_BOOKMARK = "bookmarks/REMOVE_A_PLACE_FROM_BOOKMARK";
const ADD_A_PLACE_TO_BOOKMARK = "bookmarks/ADD_A_PLACE_TO_BOOKMARK";

//action creators to handle action
const loadBookmarks = (bookmarks) => {
  return {
    type: GET_ALL_BOOKMARKS_BY_USER_ID,
    payload: bookmarks,
  };
};

const addBookmark = (bookmark) => {
  return {
    type: POST_BOOKMARK,
    payload: bookmark,
  };
};

const editBookmark = (bookmarkId, bookmark) => {
  return {
    type: EDIT_BOOKMARK,
    payload: { bookmarkId, bookmark },
  };
};

const removeBookmark = (bookmarkId) => {
  return {
    type: REMOVE_BOOKMARK,
    payload: bookmarkId,
  };
};

const loadBookmarkPlace = (bookmarkSpots) => {
  return {
    type: GET_ALL_PLACES_BY_BOOKMARK_ID,
    payload: bookmarkSpots,
  };
};

const removeAPlaceFromBookmark = (spotId) => {
  return {
    type: REMOVE_A_PLACE_FROM_BOOKMARK,
    payload: spotId,
  };
};

const addAPlaceToBookmark = (spot) => {
  return {
    type: ADD_A_PLACE_TO_BOOKMARK,
    payload: spot,
  };
};

//thunk actions
export const getBookmarksThunk = () => async (dispatch) => {
  try {
    const res = await fetch(`/api/bookmarks/current`);
    if (res.ok) {
      const data = await res.json();
      dispatch(loadBookmarks(data.bookmarks));
      return data;
    }
    throw res;
  } catch (e) {
    const data = await e.json();
    return data;
  }
};

export const postBookmarkThunk = (formData) => async (dispatch) => {
  try {
    const res = await fetch(`/api/bookmarks/new`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(addBookmark(data));
      dispatch(getBookmarksThunk());
      return data;
    }
    throw res;
  } catch (e) {
    const data = await e.json();
    return data;
  }
};

export const editBookmarkThunk = (formData, bookmarkId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/bookmarks/${bookmarkId}`, {
      method: "PUT",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(editBookmark(data));
      dispatch(getBookmarksThunk());
      return data;
    }
    throw res;
  } catch (e) {
    const data = await e.json();
    return data;
  }
};

export const deleteBookmarkThunk = (bookmarkId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/bookmarks/${bookmarkId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(removeBookmark(bookmarkId));
      return data;
    }
    throw res;
  } catch (e) {
    const data = await e.json();
    return data;
  }
};








//-----------------All thunk below are bookmark place related ----------------------------
export const getBookmarkPlacesThunk = (bookmarkId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/bookmarks/${bookmarkId}/spots`);
    console.log(res)
    if (res.ok) {
      const data = await res.json();

      dispatch(loadBookmarkPlace(data));
      return data;
    }
    throw res;
  } catch (e) {
    const data = await e.json();
    return data;
  }
};

export const deleteAPlaceFromBookmarkThunk = (bookmarkId, spotId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/bookmarks/${bookmarkId}/spots/${spotId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const data = await res.json();
      //need to update the redux store.
      dispatch(removeAPlaceFromBookmark(spotId));
      return data;
    }
    throw res;
  } catch (e) {
    const data = await e.json();
    return data;
  }
};

export const postAPlaceToBookmarkThunk = (bookmarkId, spotId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/bookmarks/${bookmarkId}/spots/${spotId}`, {
      method: "POST",
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(addAPlaceToBookmark(data));
      // dispatch(getBookmarksThunk());
      return data;
    }
    throw res;
  } catch (e) {
    const data = await e.json();
    return data;
  }
};


//declare a normalized default state
const initialState = { allBookmarks: [], byId: {}, bookmarkSpots: [] };

//create bookmark reducers to process actions
const bookmarksReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_ALL_BOOKMARKS_BY_USER_ID:
      newState.allBookmarks = action.payload;
      action.payload.forEach((bookmark) => {
        newState.byId[bookmark.id] = bookmark;
      });
      return newState;

    case POST_BOOKMARK:
      newState.allBookmarks.push(action.payload);
      newState.byId[action.payload.id] = action.payload;
      return newState;

    case EDIT_BOOKMARK: {
      const index = newState.allBookmarks.findIndex(
        (bookmark) => bookmark.id === action.payload.id
      );
      newState.allBookmarks[index] = action.payload;
      newState.byId[action.payload.id] = action.payload;
      return newState;
    }

    case REMOVE_BOOKMARK:
      newState.allBookmarks = newState.allBookmarks.filter(
        (bookmark) => bookmark.id !== action.payload
      );
      delete newState.byId[action.payload];
      return newState;

    case GET_ALL_PLACES_BY_BOOKMARK_ID:
      newState.bookmarkSpots = action.payload;
      return newState;

      case REMOVE_A_PLACE_FROM_BOOKMARK:
        newState.bookmarkSpots = newState.bookmarkSpots.filter(
          (spot) => spot.id !== action.payload
        );
        return newState;

    case ADD_A_PLACE_TO_BOOKMARK:
      newState.bookmarkSpots.push(action.payload);
      return newState;

    default:
      return state;
  }
};

export default bookmarksReducer;
