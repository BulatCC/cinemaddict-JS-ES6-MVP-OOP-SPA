import {createElement} from "../utils.js";

const filmCardTemplate = (film) => {
  const {filmCover, filmName, rating, releaseDate: {day, month, year}, duration: {minutes, hours}, description, isInWatchlist, isWatched, isFavorite, comments, genre} = film;
  const DESCRIPTION_LENGTH = 140;

  return `<article class="film-card" data-isinwatchlist="${isInWatchlist === true ? `true` : `false`}" data-iswatched="${isWatched === true ? `true` : `false`}"  data-isfavorite="${isFavorite === true ? `true` : `false`}" data-rating="${rating}" data-date="${year + ` ` + month + ` ` + day}">
  <h3 class="film-card__title">${filmName}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${+hours > 0 ? hours + `h` : ``} ${minutes}m</span>
    <span class="film-card__genre">${genre[0]}</span>
  </p>
  <img src="./images/posters/${filmCover}" alt="" class="film-card__poster">
  <p class="film-card__description">${description.length > 140 ? description.slice(0, DESCRIPTION_LENGTH) + `...` : description}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchlist === true ? `film-card__controls-item--active` : ``}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched === true ? `film-card__controls-item--active` : ``}" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite === true ? `film-card__controls-item--active` : ``}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class FilmCard {
  constructor(film, i) {
    this._element = null;
    this._film = film;
    this._i = i;
  }

  getTemplate() {
    return filmCardTemplate(this._film, this._i);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
