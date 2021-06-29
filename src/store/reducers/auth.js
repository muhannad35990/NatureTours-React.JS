import * as types from '../actions/types';

const initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_USER:
      return { ...state, data: action.payload };
    case types.LOGIN_USER:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default reducer;
