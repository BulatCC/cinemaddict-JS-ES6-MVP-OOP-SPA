import SmartView from "./smart-view.js";
import {siteBodyTag} from "../utils/utils.js";

const filmCardTemplate = (film) => {
  const {filmCover, filmName, rating, releaseDate: {year}, duration: {minutes, hours}, description, isInWatchlist, isWatched, isFavorite, comments, genre} = film;
  const DESCRIPTION_LENGTH = 140;

  return `<article class="film-card">
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

export default class FilmCard extends SmartView {
  constructor(film) {
    super();
    this._film = film;
    this._openPopupClickHandler = this._openPopupClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return filmCardTemplate(this._film);
  }

  _openPopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.openPopupClick(evt);
    siteBodyTag.classList.add(`hide-overflow`);
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick(evt);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick(evt);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick(evt);
  }

  setOpenPopupClickHandler(callback) {
    this._callback.openPopupClick = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._openPopupClickHandler);
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._openPopupClickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._openPopupClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchListClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }
}

