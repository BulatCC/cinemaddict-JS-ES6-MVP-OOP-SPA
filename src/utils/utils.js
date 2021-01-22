import Abstract from "../view/abstract-view.js";
export const siteBodyTag = document.querySelector(`body`);
export const siteHeaderTag = document.querySelector(`.header`);
export const siteMainTag = document.querySelector(`.main`);
export const moviesNumberInDB = document.querySelector(`.footer__statistics`);
export const filmList = document.querySelector(`.films-list__container`);

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


// export const renderTemplate = (container, template, place) => {
//   container.insertAdjacentHTML(place, template);
// };

// export const RenderPosition = {
//   AFTERBEGIN: `afterbegin`,
//   BEFOREEND: `beforeend`
// };

// export const renderElement = (container, element, place) => {
//   switch (place) {
//     case RenderPosition.AFTERBEGIN:
//       container.prepend(element);
//       break;
//     case RenderPosition.BEFOREEND:
//       container.append(element);
//       break;
//   }
// };

export const createElement = (template) => {
  const newElement = document.createElement(`div`); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const updateFilmCardByPopup = (evt, component) => {
  if (evt.target.classList.contains(`film-details__control-label--watchlist`)) {
    component.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).classList.toggle(`film-card__controls-item--active`);
  }

  if (evt.target.classList.contains(`film-details__control-label--watched`)) {
    component.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).classList.toggle(`film-card__controls-item--active`);
  }

  if (evt.target.classList.contains(`film-details__control-label--favorite`)) {
    component.getElement().querySelector(`.film-card__controls-item--favorite`).classList.toggle(`film-card__controls-item--active`);
  }
};
