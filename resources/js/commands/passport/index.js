import FileCommands from './fileCommands';
import AuthCommands from './authCommands';
import UserCommands from './userCommands';
import NotificationCommands from './notificationCommands';
import StudentCommands from './studentCommands';

export default {
  ...AuthCommands,
  ...UserCommands,
  ...StudentCommands,
  ...NotificationCommands,
  ...FileCommands,
};
