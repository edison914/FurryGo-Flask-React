//action types
const GET_ALL_COMMENTS_BY_SPOT_ID = "comments/GET_ALL_COMMENTS_BY_SPOT_ID";
const POST_COMMENT = "comments/POST_COMMENT";
const EDIT_COMMENT = "comments/EDIT_Comment";
const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

//action creators to handle action
const loadComments = (comments) => {
  return {
    type: GET_ALL_COMMENTS_BY_SPOT_ID,
    payload: comments,
  };
};

const addComment = (comment) => {
  return {
    type: POST_COMMENT,
    payload: comment,
  };
};

const editComment = (spotId, comment) => {
  return {
    type: EDIT_COMMENT,
    payload: { spotId, comment },
  };
};

const removeComment = (commentId) => {
  return {
    type: REMOVE_COMMENT,
    payload: commentId,
  };
};

export const getCommentsThunk = (spotId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spotId}/comments`);
    if (res.ok) {
      const data = await res.json();
      dispatch(loadComments(data.comments));
      return data;
    }
    throw res;
  } catch (e) {
    const data = await e.json();
    return data;
  }
};
//thunk action to add comment
export const postCommentThunk = (formData, spotId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spotId}/comments`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      // console.log(`good`, data);
      dispatch(addComment(data));
      dispatch(getCommentsThunk(spotId));
      return data;
    }
    throw res;
  } catch (e) {
    const data = await e.json();
    // console.log(`bad`, data);
    return data;
  }
};
//thunk action to edit comment
export const editCommentThunk =
  (formData, commentId, spotId) => async (dispatch) => {
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(editComment(data));
        dispatch(getCommentsThunk(spotId));
        return data;
      }
      throw res;
    } catch (e) {
      const data = await e.json();
      return data;
    }
  };
//thunk action to delete comment
export const deleteCommentThunk = (commentId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(removeComment(commentId));
      return data;
    }
    throw res;
  } catch (e) {
    const data = await e.json();
    return data;
  }
};
//declare a normalized default state
const initialState = { allComments: [], byId: {} };

//create comment reducers to process actions
const commentsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_ALL_COMMENTS_BY_SPOT_ID:
      newState.allComments = action.payload;
      action.payload.forEach((comment) => {
        newState.byId[comment.id] = comment;
      });
      return newState;

    case POST_COMMENT:
      newState.allComments.push(action.payload);
      newState.byId[action.payload.id] = action.payload;
      return newState;

    case EDIT_COMMENT: {
      const index = newState.allComments.findIndex(
        (comment) => comment.id === action.payload.id
      );
      newState.allComments[index] = action.payload;
      newState.byId[action.payload.id] = action.payload;
      return newState;
    }

    case REMOVE_COMMENT:
      newState.allComments = newState.allComments.filter(
        (comment) => comment.id !== action.payload
      );
      delete newState.byId[action.payload];
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
