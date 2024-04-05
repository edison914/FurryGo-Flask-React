// import { getSpotsThunk } from "./spots";

// //action types
// const POST_RATING = "ratings/POST_RATING";
// const EDIT_RATING = "ratings/EDIT_RATING";
// const REMOVE_RATING = "ratings/REMOVE_RATING";

// //action creators to handle action
// const addRating = (rating, spotId) => {
//   return {
//     type: POST_RATING,
//     payload: rating,
//   };
// };

// const editRating = (rating, spotId) => {
//   return {
//     type: EDIT_RATING,
//     payload: { rating, spotId },
//   };
// };

// const removeRating = (ratingId) => {
//   return {
//     type: REMOVE_RATING,
//     payload: ratingId,
//   };
// };

// //thunk action to add rating
// export const postRatingThunk = (formData, spotId) => async (dispatch) => {
//   try {
//     const res = await fetch(`/api/spots/${spotId}/ratings`, {
//       method: "POST",
//       body: formData,
//     });

//     if (res.ok) {
//       const data = await res.json();
//       dispatch(addRating(data));
//       dispatch(getSpotsThunk());
//       return data;
//     }
//     throw res;
//   } catch (e) {
//     const data = await e.json();
//     return data;
//   }
// };
// //thunk action to edit rating
// export const editRatingThunk =
//   (formData, ratingId) => async (dispatch) => {
//     try {
//       const res = await fetch(`/api/ratings/${ratingId}`, {
//         method: "PUT",
//         body: formData,
//       });
//       if (res.ok) {
//         const data = await res.json();
//         dispatch(editRating(data));
//         dispatch(getSpotsThunk());
//         return data;
//       }
//       throw res;
//     } catch (e) {
//       const data = await e.json();
//       return data;
//     }
//   };

// //thunk action to delete rating
// export const deleteRatingThunk = (ratingId) => async (dispatch) => {
//   try {
//     const res = await fetch(`/api/ratings/${ratingId}`, {
//       method: "DELETE",
//     });
//     if (res.ok) {
//       const data = await res.json();
//       dispatch(removeRating(ratingId));
//       return data;
//     }
//     throw res;
//   } catch (e) {
//     const data = await e.json();
//     return data;
//   }
// };
