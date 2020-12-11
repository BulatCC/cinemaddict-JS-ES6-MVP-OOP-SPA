export const ESC_KEYCODE = 27;
export const siteBodyTag = document.querySelector(`body`);
export const siteHeaderTag = document.querySelector(`.header`);
export const siteMainTag = document.querySelector(`.main`);

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElements = (arr, toString = false) => {
  let set = new Set();
  for (let i = 0; i < arr.length; i++) {
    set.add(arr[getRandomInteger(0, arr.length - 1)]);
  }

  if (toString) {
    return Array.from(set).join(`, `);
  }
  return Array.from(set);
};
