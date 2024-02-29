//action types
const LOAD_SPOTS = "spots/LOAD_SPOTS";
const LOAD_CURRENT_USER_SPOTS = "spots/LOAD_CURRENT_USER_SPOTS";
const REMOVE_SPOT = "spots/REMOVE_SPOT";


//action creator to handle actions
const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    payload: spots,
  };
};

const loadCurrentUserSpots = (spots) => {
  return {
    type: LOAD_CURRENT_USER_SPOTS,
    payload: spots,
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
      console.log(data)
      dispatch(loadSpots(data.spots));
      return data;
    }
    throw res;
  } catch (e) {
    const data = await e.json();
    return data;
  }
};

//initial normalized state
const initialState = { allSpots: [], byId:[]};

const spotReducers = (state = initialState, action) => {
  let newState = {...state};
  switch(action.type) {
    case LOAD_SPOTS:
      newState.allSpots = action.payload;
      action.payload.forEach((spot) => {
          newState.byId[spot.id] = spot;
      })
    return newState;
    default:
      return state;
  }
}

export default spotReducers
