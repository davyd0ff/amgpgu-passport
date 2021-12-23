export default class Storage {
  static _containerName = 'app';

  static get = (key) => {
    const appStorage = localStorage[Storage._containerName];
    if (appStorage) {
      const app = JSON.parse(appStorage);
      return app[key] || {};
    }

    return {};
  };

  static save = (obj) => {
    const appStorage = localStorage[Storage._containerName] || '{}';
    const app = JSON.parse(appStorage);
    localStorage[Storage._containerName] = JSON.stringify({ ...app, ...obj });
  };

  static clear = () => {
    localStorage[Storage._containerName] = '';
  };
}
