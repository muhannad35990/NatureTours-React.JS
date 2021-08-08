import {
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  NotFound,
  Home,
  NotAuth,
  Me,
  TourDetails,
  MyBookings,
  MyReviews,
  Billing,
} from "../pages";
import Layout from "../pages/Layout/Layout";

import { AUTH_ONLY, RESTRICT_TO } from "./types";

export default () => [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/tour/:id",
    exact: true,
    component: TourDetails,
  },
  // {
  //   path: "/dashboard",
  //   exact: true,
  //   component: Dashboard,
  //   error: NotAuth,
  //   meta: {
  //     [AUTH_ONLY]: true,
  //     [RESTRICT_TO]: ["admin"],
  //   },
  // },
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
    path: "/MyBookings",
    exact: true,
    component: MyBookings,
    error: NotAuth,
    meta: {
      [AUTH_ONLY]: true,
    },
  },
  {
    path: "/MyReviews",
    exact: true,
    component: MyReviews,
    error: NotAuth,
    meta: {
      [AUTH_ONLY]: true,
    },
  },
  {
    path: "/Billing",
    exact: true,
    component: Billing,
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
