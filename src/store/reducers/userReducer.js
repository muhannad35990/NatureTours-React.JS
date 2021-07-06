import * as types from '../actions/types';

const initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_ME:
      return { ...state };

    default:
      return state;
  }
};

export default reducer;
