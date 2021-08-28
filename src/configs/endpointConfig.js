export const BACKEND_URL = "http://localhost:3002";
// export const BACKEND_URL = "https://whispering-mesa-68369.herokuapp.com";

//auth
export const REGISTER_URL = `${BACKEND_URL}/api/v1/users/signup`;
export const LOGIN_URL = `${BACKEND_URL}/api/v1/users/login`;
export const UPDATE_ME = `${BACKEND_URL}/api/v1/users/updateMe`;
export const FORGOT_PASSWORD = `${BACKEND_URL}/api/v1/users/forgotPassword`;
export const RESET_PASSWORD = `${BACKEND_URL}/api/v1/users/resetPassword`;
export const AUTO_LOGIN = `${BACKEND_URL}/api/v1/users/autologin`;
export const UPDATE_PASSWORD = `${BACKEND_URL}/api/v1/users/updateMyPassword`;
export const USERS = `${BACKEND_URL}/api/v1/users`;
export const GOOGLE_LOGIN = `${BACKEND_URL}/api/v1/users/google`;
export const FACEBOOK_LOGIN = `${BACKEND_URL}/api/v1/users/facebook`;
//Tours
export const TOURS = `${BACKEND_URL}/api/v1/tours`;

//reviews
export const REVIEWS = `${BACKEND_URL}/api/v1/reviews`;
//Bookings
export const BOOKINGS = `${BACKEND_URL}/api/v1/bookings`;
