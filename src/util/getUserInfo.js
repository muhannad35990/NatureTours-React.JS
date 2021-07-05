import store from '../store';

function getUserInfo() {
  const state = store.getState();
  return state.auth.user;
}

export default getUserInfo;
