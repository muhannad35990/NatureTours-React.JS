import * as types from "../actions/types";

const initialState = {
  userReviews: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_REVIEWS:
      return { ...state, userReviews: action.payload };

    default:
      return state;
  }
};

export default reducer;
