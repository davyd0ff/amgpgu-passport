import * as appRoutes from './app/route-data';
import * as studentRoutes from './student/route-data';
import * as adminRoutes from './admin/route-data';
import * as notificationRoutes from './notification/route-data';

import factory from './routeFactory';

export default [
  ...factory.make(appRoutes),
  ...factory.make(studentRoutes),
  ...factory.make(notificationRoutes),
  ...factory.make(adminRoutes),
];
