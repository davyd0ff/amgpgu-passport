export const HOME = {
  path: '/',
  component: () => import('@/pages/Home'),
  name: 'Home',
  meta: {
    title: 'HOME_PAGE_TITLE',
    auth: true,
  },
};

export const PROFILE = {
  path: '/profile',
  component: () => import('@/pages/Profile'),
  name: 'Profile',
  meta: {
    title: 'PROFILE_PAGE_TITLE',
    auth: true,
  },
};

// export const LOGIN_ROUTE_DATA = {
//   path: "/login",
//   component: () => import('@/pages/Login'),
//   name: "Login",
//   meta: {
//     title: "LOGIN_PAGE_TITLE",
//     auth: false,
//   }
// }
