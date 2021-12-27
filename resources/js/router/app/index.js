import {
  HOME_ROUTE_DATA,
  PROFILE_ROUTE_DATA,
  LOGIN_ROUTE_DATA,
} from './route-data';

export default [
  {
    ...HOME_ROUTE_DATA,
    component: () => import('@/pages/Home'),
  },
  {
    ...PROFILE_ROUTE_DATA,
    component: () => import('@/pages/Profile'),
  },
  {
    ...LOGIN_ROUTE_DATA,
    component: () => import('@/pages/Login'),
  },
];
