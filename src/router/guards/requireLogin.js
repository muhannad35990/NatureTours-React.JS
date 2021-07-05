import { AUTH_ONLY, RESTRICT_TO } from "../types";
import getIsLoggedIn from "../../util/getIsLoggedIn";
import getUserInfo from "../../util/getUserInfo";

const requireLogin = (to, from, next) => {
  if (to.meta[AUTH_ONLY] && !getIsLoggedIn()) {
    next.redirect("/login");
  }

  if (
    getIsLoggedIn() &&
    to.meta[RESTRICT_TO] &&
    !to.meta[RESTRICT_TO].includes(getUserInfo().role)
  )
    next.redirect("/NotAuth");

  next();
};

export default requireLogin;
