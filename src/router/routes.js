import {
  Dashboard,
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  NotFound,
  Home,
  NotAuth,
  Me,
} from "../pages";

import { AUTH_ONLY, RESTRICT_TO } from "./types";

export default () => [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/dashboard",
    exact: true,
    component: Dashboard,
    error: NotAuth,
    meta: {
      [AUTH_ONLY]: true,
      [RESTRICT_TO]: ["admin"],
    },
  },
  {
    path: "/Me",
    exact: true,
    component: Me,
    error: NotAuth,
    meta: {
      [AUTH_ONLY]: true,
    },
  },
  {
    path: "/forgotPassword",
    exact: true,
    component: ForgotPassword,
  },
  {
    path: "/resetPassword/:token",
    component: ResetPassword,
  },
  {
    path: "/register",
    exact: true,
    component: Register,
  },
  {
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    path: "/NotAuth",
    exact: true,
    component: NotAuth,
  },
  {
    path: "/NotFound",
    exact: true,
    component: NotFound,
  },
  {
    path: "*",
    component: NotFound,
    ignoreGlobal: true,
  },
];
