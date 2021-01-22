import {render} from "../utils/render";
import {remove, siteBodyTag, updateFilmCardByPopup} from "../utils/utils.js";
import FilmCard from "../view/film-card-template.js";
import PopupFilmDetails from "../view/popup-film-details-template.js";

let isPopupRendered = false;

export default class Film {
  constructor(changeData) {
    this._changeData = changeData;
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleRemovePopup = this._handleRemovePopup.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._popupComponent = null;
    this._filmCardComponent = null;
  }

  init(container, filmCardData) {
    const prevfilmCardComponent = this._filmCardComponent;

    this._filmCardData = filmCardData;
    this._filmCardComponent = new FilmCard(filmCardData);
    this._container = container;
    if (prevfilmCardComponent === null) {
      this._renderFilmCard();
      return;
    }
  }

  _renderFilmCard() {
    render(this._container, this._filmCardComponent, `beforeend`);

    this._filmCardComponent.setOpenPopupClickHandler(this._handleFilmCardClick);
    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
  }

  _renderPopup() {
    if (isPopupRendered === false) {
      isPopupRendered = true;
      this._popupComponent = new PopupFilmDetails(this._filmCardData);
      render(siteBodyTag, this._popupComponent, `beforeend`);
      this._popupComponent.setClosePopupHandler(this._handleRemovePopup);
      this._popupComponent.setWatchListClickHandler(this._handleWatchListClick);
      this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
      this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    }
  }

  _handleRemovePopup() {
    remove(this._popupComponent);
    isPopupRendered = false;
    this._popupComponent.removeClosePopupHandler();
    this._popupComponent = null;
  }

  _handleFilmCardClick() {
    this._renderPopup();
  }
  _markChangeState(evt) {
    if (evt.target.classList.contains(`film-card__controls-item`)) {
      evt.target.classList.toggle(`film-card__controls-item--active`);
    }

    // обновляет данные карточки при изменении в попапе
    updateFilmCardByPopup(evt, this._filmCardComponent);
  }

  _handleWatchListClick(evt) {
    this._filmCardData.isInWatchlist = !this._filmCardData.isInWatchlist;
    this._changeData(this._filmCardData);
    this._markChangeState(evt);
  }

  _handleWatchedClick(evt) {
    this._filmCardData.isWatched = !this._filmCardData.isWatched;
    this._changeData(this._filmCardData);
    this._markChangeState(evt);
  }

  _handleFavoriteClick(evt) {
    this._filmCardData.isFavorite = !this._filmCardData.isFavorite;
    this._changeData(this._filmCardData);
    this._markChangeState(evt);
  }

  destroy() {
    remove(this._filmCardComponent);
  }
}
