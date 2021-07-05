import { ADMIN_ONLY } from '../types';
import getUserInfo from '../../util/getUserInfo';

const requireAdminOnly = (to, from, next) => {
  if (!getUserInfo().role === 'admin') {
    next.redirect('/NotAuth');
  }
  next();
};

export default requireAdminOnly;
