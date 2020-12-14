import {userProfileTemplate} from "./view/user-profile-template.js";
import {navigationTemplate} from "./view/navigation-template.js";
import {sortTemplate} from "./view/sort-template.js";
import {filmSectionTemplate} from "./view/film-section-template.js";
import {filmCardTemplate} from "./view/film-card-template.js";
import {showMoreButtonTemplate} from "./view/show-more-button-template.js";
import {moviesNumberTempalte} from "./view/movies-number-template.js";
import {popupFilmDetailsTemplate} from "./view/popup-film-details-template.js";
import {generateFilm} from "./mock/film-data.js";
import {ESC_KEYCODE, siteBodyTag, siteHeaderTag, siteMainTag} from "./utils.js";

const FILM_CARD_COUNT = 24;
const FILM_CARD_COUNT_PER_STEP = 5;
const FILM_CARD_COUNT_EXTRA = 2;
const moviesNumberinDB = document.querySelector(`.footer__statistics`);

const films = new Array(FILM_CARD_COUNT).fill().map(generateFilm);

let filmSortForPopup = films;
let currentFilmSort = films.slice();
let defaultSort = films;

const STATUSES = {
  all: `all`,
  watchlist: `watchlist`,
  watched: `watched`,
  favorite: `favorite`
};

const SORT = {
  byDefault: `sort by default`,
  byDate: `sort by date`,
  byRating: `sort by rating`
};

let isInWatchList = null;
let isWatched = null;
let isFavorite = null;

// фильтр статуса фильмов
const getFilterList = () => {
  isInWatchList = currentFilmSort.filter((item) => {
    return item.isInWatchlist;
  });
  isWatched = currentFilmSort.filter((item) => {
    return item.isWatched;
  });
  isFavorite = currentFilmSort.filter((item) => {
    return item.isFavorite;
  });
};

getFilterList();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderTag, userProfileTemplate(), `beforeend`);
render(siteMainTag, navigationTemplate(isInWatchList, isWatched, isFavorite), `beforeend`);
render(siteMainTag, sortTemplate(), `beforeend`);
render(siteMainTag, filmSectionTemplate(), `beforeend`);

const pageFilms = document.querySelector(`.films`);
const filmsList = document.querySelector(`.films-list__container`);
const filmsListTopRated = document.querySelector(`.films-list__container--top-rated-js`);
const filmsListMostCommented = document.querySelector(`.films-list__container--most-commented-js`);
const sortButtonsArea = document.querySelector(`.sort`);
const sortDefaultButton = sortButtonsArea.querySelector(`.sort__button`);

// рендерит фильмы
const showMoreFilms = (filmsToRender) => {
  for (let i = 0; i < FILM_CARD_COUNT_PER_STEP; i++) {
    render(filmsList, filmCardTemplate(filmsToRender[i], i), `beforeend`);
  }

  if (filmsToRender.length > FILM_CARD_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_CARD_COUNT_PER_STEP;
    render(filmsList, showMoreButtonTemplate(), `afterend`);
    let showMoreButton = pageFilms.querySelector(`.films-list__show-more`);

    showMoreButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      filmsToRender.slice(renderedFilmCount, renderedFilmCount + FILM_CARD_COUNT_PER_STEP)
      .forEach((film, i) => render(filmsList, filmCardTemplate(film, i + renderedFilmCount), `beforeend`));

      renderedFilmCount += FILM_CARD_COUNT_PER_STEP;

      if (renderedFilmCount >= filmsToRender.length) {
        showMoreButton.remove();
      }
    });
  }
};

showMoreFilms(films);

for (let i = 0; i < FILM_CARD_COUNT_EXTRA; i++) {
  render(filmsListTopRated, filmCardTemplate(films[i], i), `beforeend`);
  render(filmsListMostCommented, filmCardTemplate(films[i], i), `beforeend`);
}

render(moviesNumberinDB, moviesNumberTempalte(), `beforeend`);

const filterList = document.querySelector(`.main-navigation__items`);

// удаляет попап 'детали фильма'
let closeButton = null;
const removePopup = () => {
  let popup = document.querySelector(`.film-details`);
  siteBodyTag.classList.remove(`hide-overflow`);
  if (popup) {
    popup.remove();
  }
  closeButton.removeEventListener(`click`, removePopup);
  document.removeEventListener(`keydown`, onEscKeyPopupRemove);
};

const onEscKeyPopupRemove = (evt) => {
  if (evt.keyCode === ESC_KEYCODE) {
    removePopup();
  }
};

// открывает/закрывает попап детали фильма
pageFilms.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__comments`)) {
    render(siteBodyTag, popupFilmDetailsTemplate(filmSortForPopup[evt.target.parentNode.dataset.id]), `beforeend`);
    siteBodyTag.classList.add(`hide-overflow`);
    closeButton = document.querySelector(`.film-details__close-btn`);
    closeButton.addEventListener(`click`, removePopup);
    document.addEventListener(`keydown`, onEscKeyPopupRemove);
  }
});

// удаляет активный css класс у элемента
const classNameRemover = (className) => {
  let element = document.querySelector(`.` + className);
  if (element) {
    element.classList.remove(className);
  }
};

// функция для рендера и фильтрации карточек фильмов
const renderFilteredFilms = (evt, status, filmsData) => {
  if (evt.target.dataset.status === status) {
    filmSortForPopup = filmsData;
    defaultSort = filmsData;
    evt.preventDefault();
    classNameRemover(`main-navigation__item--active`);
    classNameRemover(`sort__button--active`);
    evt.target.classList.add(`main-navigation__item--active`);
    sortDefaultButton.classList.add(`sort__button--active`);
    filmsList.innerHTML = ``;
    let showMoreButton = document.querySelector(`.films-list__show-more`);
    if (showMoreButton) {
      showMoreButton.remove();
    }

    showMoreFilms(filmsData);
  }
};

// рендерит и фильтрует карточки фильмов
filterList.addEventListener(`click`, (evt) => {
  renderFilteredFilms(evt, STATUSES.all, films);
  renderFilteredFilms(evt, STATUSES.watchlist, isInWatchList);
  renderFilteredFilms(evt, STATUSES.watched, isWatched);
  renderFilteredFilms(evt, STATUSES.favorite, isFavorite);
});

// сортирует по дате, по рейтингу, по умолчанию
sortButtonsArea.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  classNameRemover(`sort__button--active`);
  evt.target.classList.add(`sort__button--active`);
  let showMoreButton = document.querySelector(`.films-list__show-more`);
  if (showMoreButton) {
    showMoreButton.remove();
  }
  filmsList.innerHTML = ``;

  if (evt.target.textContent.toLowerCase() === SORT.byDefault) {
    showMoreFilms(defaultSort);
  }

  if (evt.target.textContent.toLowerCase() === SORT.byDate) {
    currentFilmSort.sort((a, b) => {
      return Date.parse(b.releaseDate.year) - Date.parse(a.releaseDate.year);
    });

    filmSortForPopup = currentFilmSort;
    showMoreFilms(currentFilmSort);
  }

  if (evt.target.textContent.toLowerCase() === SORT.byRating) {
    currentFilmSort.sort((a, b) => {
      return b.rating - a.rating;
    });

    filmSortForPopup = currentFilmSort;
    showMoreFilms(currentFilmSort);
  }
});

