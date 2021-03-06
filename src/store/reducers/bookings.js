import * as types from "../actions/types";

const initialState = {
  bookings: [],
  session: null,
  booking: null,
  mybookings: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ALL_BOOKINGS:
      return { ...state, bookings: action.payload };
    case types.SET_CHECKOUT_SESSION:
      return { ...state, session: action.payload };
    case types.SET_BOOKING:
      return { ...state, booking: action.payload };
    case types.SET_MY_BOOKINGS:
      return { ...state, mybookings: action.payload };

    default:
      return state;
  }
};

export default reducer;
