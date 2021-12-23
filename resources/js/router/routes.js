import appRoutes from './app';
import studentRoutes from './student';
import adminRoutes from './admin';
import notificationRoutes from './notification';


export default [
  ...appRoutes,
  ...studentRoutes,
  ...notificationRoutes,
  ...adminRoutes,
];