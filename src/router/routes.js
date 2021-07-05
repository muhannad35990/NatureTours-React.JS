import {
  Dashboard,
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  UserHome,
  NotFound,
  Home,
  NotAuth,
} from "../pages";

import { AUTH_ONLY, RESTRICT_TO } from "./types";

export default () => [
  {
    path: "/",
    exact: true,
    component: Home,

    meta: {
      [AUTH_ONLY]: true,
    },
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
    path: "/userHome",
    exact: true,
    component: UserHome,
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
