import store from "../store";

function getIsLoggedIn() {
  const state = store.getState();
  return state.auth.loggedIn;
}

export default getIsLoggedIn;
