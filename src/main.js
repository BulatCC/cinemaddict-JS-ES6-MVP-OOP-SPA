import {userProfile} from "./view/userProfile.js";
import {navigation} from "./view/navigation.js";
import {sort} from "./view/sort.js";
import {filmSection} from "./view/filmSection.js";
import {filmCard} from "./view/filmCard.js";
import {showMoreButton} from "./view/showMoreButton.js";

const siteHeaderTag = document.querySelector(`.header`);
const siteMainTag = document.querySelector(`.main`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const FILM_CARD_COUNT = 5;
const FILM_CARD_COUNT_TOP_RATED = 2;

render(siteHeaderTag, userProfile(), `beforeend`);
render(siteMainTag, navigation(), `beforeend`);
render(siteMainTag, sort(), `beforeend`);
render(siteMainTag, filmSection(), `beforeend`);

const filmsList = document.querySelector(`.films-list__container`);
const filmsListTopRated = document.querySelector(`.films-list__container--top-rated-js`);
const filmsListMostCommented = document.querySelector(`.films-list__container--most-commented-js`);

for (let i = 0; i < FILM_CARD_COUNT; i++) {
  render(filmsList, filmCard(), `beforeend`);
}

render(filmsList, showMoreButton(), `afterend`);

for (let i = 0; i < FILM_CARD_COUNT_TOP_RATED; i++) {
  render(filmsListTopRated, filmCard(), `beforeend`);
  render(filmsListMostCommented, filmCard(), `beforeend`);
}
