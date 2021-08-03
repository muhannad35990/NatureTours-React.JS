import * as types from "../actions/types";

const initialState = {
  tours: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_TOURS:
      return { ...state };

    case types.SET_TOURS_DATA:
      return { ...state, tours: action.payload };

    default:
      return state;
  }
};

export default reducer;
