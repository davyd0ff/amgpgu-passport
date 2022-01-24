import Queue from '@/utils/Queue';
import mapping from './mapMenuItemToUrl';

const makeFrontendMenuItem = (menuItem) => {
  let url = mapping(menuItem.title);

  if (url && menuItem.subpath) {
    url = `${url}/${menuItem.subpath}`;
  }

  return {
    ...menuItem,
    ...(url ? { url } : {}),
  };
};

const turnMenuItemsToFrontendMenuItems = (menuItem) => {
  const queue = new Queue();
  const marked = new Map();
  const turnedMenuItem = makeFrontendMenuItem(menuItem);

  queue.push(turnedMenuItem);
  marked.set(turnedMenuItem, true);

  while (queue.isNotEmpty()) {
    const item = queue.pop();

    if (item?.items?.length) {
      item.items = item.items.map((el) => makeFrontendMenuItem(el));
      item.items.forEach((el) => {
        if (!marked.has(el)) {
          queue.push(el);
        }
      });
    }
  }

  return turnedMenuItem;
};

export default turnMenuItemsToFrontendMenuItems;
