export const HOME = {
  path: '/',
  component: () => import('@/pages/Home'),
  name: 'Home',
  meta: {
    title: 'HOME__TITLE_PAGE',
    auth: true,
  },
};

export const PROFILE = {
  path: '/profile',
  component: () => import('@/pages/Profile'),
  name: 'Profile',
  meta: {
    title: 'PROFILE__TITLE_PAGE',
    auth: true,
  },
};

// export const LOGIN_ROUTE_DATA = {
//   path: "/login",
//   component: () => import('@/pages/Login'),
//   name: "Login",
//   meta: {
//     title: "LOGIN_TITLE_PAGE",
//     auth: false,
//   }
// }
