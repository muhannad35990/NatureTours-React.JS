import * as types from "../actions/types";

const initialState = {
  tours: [],
  tour: null,
  reviews: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TOURS_DATA:
      return { ...state, tours: action.payload };
    case types.SET_TOUR:
      return { ...state, tour: action.payload };
    case types.SET_TOUR_REVIEWS:
      return { ...state, reviews: action.payload };

    default:
      return state;
  }
};

export default reducer;
