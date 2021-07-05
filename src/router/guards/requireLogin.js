import { AUTH_ONLY } from "../types";
import getIsLoggedIn from "../../util/getIsLoggedIn";

const requireLogin = (to, from, next) => {
  if (to.meta[AUTH_ONLY] && !getIsLoggedIn()) {
    next.redirect("/login");
  }
  next();
};

export default requireLogin;
