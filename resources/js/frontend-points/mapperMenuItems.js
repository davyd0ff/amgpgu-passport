import Queue from '@/utils/Queue';
import mapMenuItemsAndUrls from './mapMenuItemToUrl';

const map = new Map(mapMenuItemsAndUrls);

const replaceUrlParameters = (url, menuItem) =>
  url
    .split('/')
    .map((str) => {
      if (str.startsWith(':') && menuItem?.context[str.substring(1)]) {
        return menuItem.context[str.substring(1)];
      }
      return str;
    })
    .join('/');

const getUrl = (key) => map.get(key) ?? '';

const convertToFrontendMenuItem = (menuItem) => {
  const url = replaceUrlParameters(getUrl(menuItem.title), menuItem);

  return {
    ...menuItem,
    ...(url !== '' ? { url } : {}),
  };
};

const convertMenuItemsToFrontendMenuItems = (menuItem) => {
  const queue = new Queue();
  const marked = new Map();
  const turnedMenuItem = convertToFrontendMenuItem(menuItem);

  queue.push(turnedMenuItem);
  marked.set(turnedMenuItem, true);

  while (queue.isNotEmpty()) {
    const item = queue.pop();

    if (item?.items?.length) {
      item.items = item.items.map((el) => convertToFrontendMenuItem(el));
      item.items.forEach((el) => {
        if (!marked.has(el)) {
          queue.push(el);
        }
      });
    }
  }

  return turnedMenuItem;
};

export default convertMenuItemsToFrontendMenuItems;
