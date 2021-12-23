import ru from '../locales/ru.json';

const locales = {
  'ru-RU': ru,
  'en-US': {},
};

export default function (key) {
  // todo develop: заменить на получение из store
  const locale = 'ru-RU';
  return locales[locale][key] ?? key;
}
