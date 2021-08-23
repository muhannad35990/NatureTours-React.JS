import * as types from "../actions/types";

const initialState = {
  user: null,
  users: [],
  guides: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_ME:
      return { ...state };
    case types.SET_USERS:
      return { ...state, users: action.payload };
    case types.SET_GUIDES:
      return { ...state, guides: action.payload };

    default:
      return state;
  }
};

export default reducer;
