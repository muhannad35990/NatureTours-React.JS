import * as types from "../actions/types";

const initialState = {
  userReviews: [],
  allReviews: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_REVIEWS:
      return { ...state, userReviews: action.payload };
    case types.SET_ALL_REVIEWS:
      return { ...state, allReviews: action.payload };

    default:
      return state;
  }
};

export default reducer;
