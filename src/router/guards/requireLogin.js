import { AUTH_ONLY } from "../types";
import getIsLoggedIn from "../../util/getIsLoggedIn";

const requireLogin = (to, from, next) => {
  const isloggedIn = getIsLoggedIn();
  if (to.meta[AUTH_ONLY] && !isloggedIn) {
    next.redirect("/login");
  }
  next();
};

export default requireLogin;
