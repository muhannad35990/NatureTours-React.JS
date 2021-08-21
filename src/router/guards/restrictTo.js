import { AUTH_ONLY, RESTRICT_TO } from "../types";
import getIsLoggedIn from "../../util/getIsLoggedIn";
import getUserInfo from "../../util/getUserInfo";
const restrictTo = (to, from, next) => {
  if (
    getIsLoggedIn() &&
    to.meta[RESTRICT_TO] &&
    !to.meta[RESTRICT_TO].includes(getUserInfo().role)
  ) {
    next.redirect("/NotAuth");
  }

  next();
};

export default restrictTo;
