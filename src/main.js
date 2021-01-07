import UserProfile from "./view/user-profile-template.js";
import Navigation from "./view/navigation-template.js";
import Sort from "./view/sort-template.js";
import FilmSection from "./view/film-section-template.js";
import FilmCard from "./view/film-card-template.js";
import ShowMoreButton from "./view/show-more-button-template.js";
import MoviesNumber from "./view/movies-number-template.js";
import PopupFilmDetails from "./view/popup-film-details-template.js";
import NoFilms from "./view/no-films-template.js";
import {generateFilm} from "./mock/film-data.js";
import {ESC_KEYCODE, siteBodyTag, siteHeaderTag, siteMainTag} from "./utils/utils.js";
import {render} from "./utils/render.js";

const FILM_CARD_COUNT = 24;
const FILM_CARD_COUNT_PER_STEP = 5;
const FILM_CARD_COUNT_EXTRA = 2;
const moviesNumberinDB = document.querySelector(`.footer__statistics`);
const films = new Array(FILM_CARD_COUNT).fill().map(generateFilm);

render(siteHeaderTag, new UserProfile().getElement(), `beforeend`);
render(siteMainTag, new Navigation().getElement(), `beforeend`);
if (films.length !== 0) {
  render(siteMainTag, new Sort().getElement(), `beforeend`);
}
render(siteMainTag, new FilmSection().getElement(), `beforeend`);

const filmsList = document.querySelector(`.films-list__container`);
const filmsListTopRated = document.querySelector(`.films-list__container--top-rated-js`);
const filmsListMostCommented = document.querySelector(`.films-list__container--most-commented-js`);
const loadMoreButton = new ShowMoreButton();

// открывает/закрывает попап детали фильма
const showPopup = (evt) => {
  if (evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__comments`)) {
    let popupDetails = new PopupFilmDetails(films[0]);
    render(siteBodyTag, popupDetails.getElement(), `beforeend`);
    popupDetails.setClosePopupClickHandler(() => {
      removePopup();
    });
    siteBodyTag.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, onEscKeyPopupRemove);
  }
};

// удаляет попап 'детали фильма'
const removePopup = () => {
  let popup = document.querySelector(`.film-details`);
  siteBodyTag.classList.remove(`hide-overflow`);
  if (popup) {
    popup.remove();
  }
  // closeButton.removeEventListener(`click`, removePopup);
  document.removeEventListener(`keydown`, onEscKeyPopupRemove);
};

const onEscKeyPopupRemove = (evt) => {
  if (evt.keyCode === ESC_KEYCODE) {
    removePopup();
  }
};

const renderCard = (cardListElement, card) => {
  const cardComponent = new FilmCard(card);
  render(cardListElement, cardComponent.getElement(), `beforeend`);

  cardComponent.setOpenPopupClickHandler((evt) => {
    showPopup(evt);
  });
};

// рендерит фильмы
const showFilms = (filmsToRender) => {

  if (filmsToRender.length === 0) {
    render(filmsList, new NoFilms().getElement(), `beforeend`);
    return;
  }

  for (let i = 0; i < FILM_CARD_COUNT_PER_STEP; i++) {
    renderCard(filmsList, filmsToRender[i], `beforeend`);
  }

  if (filmsToRender.length > FILM_CARD_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_CARD_COUNT_PER_STEP;
    render(filmsList, loadMoreButton.getElement(), `afterbegin`);

    loadMoreButton.setClickHandler(() => {
      filmsToRender.slice(renderedFilmCount, renderedFilmCount + FILM_CARD_COUNT_PER_STEP)
      .forEach((film) => renderCard(filmsList, film, `beforeend`));

      renderedFilmCount += FILM_CARD_COUNT_PER_STEP;

      if (renderedFilmCount >= filmsToRender.length) {
        loadMoreButton.getElement().remove();
      }
    });
  }
};

showFilms(films);

for (let i = 0; i < FILM_CARD_COUNT_EXTRA; i++) {
  renderCard(filmsListTopRated, films[i], `beforeend`);
  renderCard(filmsListMostCommented, films[i], `beforeend`);
}

render(moviesNumberinDB, new MoviesNumber().getElement(), `beforeend`);
