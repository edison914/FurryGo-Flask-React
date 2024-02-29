//action types
const LOAD_SPOTS = "spots/LOAD_SPOTS";
const LOAD_CURRENT_USER_SPOTS = "spots/LOAD_CURRENT_USER_SPOTS";
const REMOVE_SPOT = "spots/REMOVE_SPOT";
const CREATE_SPOT = "spots/CREATE_SPOT";

//action creator to handle actions
const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    payload: spots,
  };
};

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    payload: spot,
  };
};

const removeSpots = (spotId) => {
  return {
    type: REMOVE_SPOT,
    payload: spotId,
  };
};

//thunk action to find all spots.
export const getSpotsThunk = () => async (dispatch) => {
  try {
    const res = await fetch("/api/spots");

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      dispatch(loadSpots(data.spots));
      return data;
    }
    throw res;
  } catch (e) {
    const data = await e.json();
    return data;
  }
};

//thunk action to find spots of current User.
export const getCurrentUserSpotsThunk = () => async (dispatch) => {
  try {
    const res = await fetch("/api/spots/current");

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      dispatch(loadSpots(data.spots));
      return data;
    }
    throw res;
  } catch (e) {
    const data = await e.json();
    return data;
  }
};

//thunk action to find all spots.
export const createSpotThunk = (spot) => async (dispatch) => {
  try {
    const res = await fetch("/api/spots", {
      method: "POST",
      body: spot,
    });

    if (res.ok) {
      const data = await res.json();
      // console.log(data);
      dispatch(createSpot(data));
      return data;
    }
    throw res;
  } catch (e) {
    const data = await e.json();
    return data;
  }
};

//initial normalized state
const initialState = { allSpots: [], byId: [] };

const spotReducers = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_SPOTS:
      newState.allSpots = action.payload;
      action.payload.forEach((spot) => (newState.byId[spot.id] = spot));
      return newState;
      
    case CREATE_SPOT:
      newState.allSpots.push(action.payload);
      newState.byId[action.payload.id] = action.payload;
      return newState;

    default:
      return state;
  }
};

export default spotReducers;
