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
} from '../pages';

import { requireAdminOnly } from './guards';
import { AUTH_ONLY, ADMIN_ONLY } from './types';

export default () => [
  {
    path: '/',
    exact: true,
    component: Home,

    meta: {
      [AUTH_ONLY]: true,
    },
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    error: NotAuth,
    meta: {
      [AUTH_ONLY]: true,
    },
    guards: { requireAdminOnly },
  },
  {
    path: '/userHome',
    exact: true,
    component: UserHome,
    error: NotAuth,
    meta: {
      [AUTH_ONLY]: true,
    },
  },
  {
    path: '/forgotPassword',
    exact: true,
    component: ForgotPassword,
  },
  {
    path: '/register',
    exact: true,
    component: Register,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/NotAuth',
    exact: true,
    component: NotAuth,
  },
  {
    path: '/NotFound',
    exact: true,
    component: NotFound,
  },
  {
    path: '*',
    component: NotFound,
    ignoreGlobal: true,
  },
];
