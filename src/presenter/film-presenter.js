import {render} from "../utils/render";
import {remove, siteBodyTag} from "../utils/utils.js";
import {UpdateType, UserAction} from "../consts.js";
import FilmCard from "../view/film-card-template.js";
import PopupFilmDetails from "../view/popup-film-details-template.js";
import dayjs from "dayjs";

let isPopupRendered = false;

export default class Film {
  constructor(changeData, filmsModel) {
    this._filmsModel = filmsModel;
    this._changeData = changeData;
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleRemovePopup = this._handleRemovePopup.bind(this);
    this._handleEscDownRemovePopup = this._handleEscDownRemovePopup.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
    this._handleAddComment = this._handleAddComment.bind(this);
    this._popupComponent = null;
    this._filmCardComponent = null;
  }

  init(container, filmCardData) {
    this._filmCardData = filmCardData;
    this._filmCardComponent = new FilmCard(filmCardData);
    this._container = container;
    this._renderFilmCard();
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
      this._popupComponent.setEscDownClosePopupHandler(this._handleEscDownRemovePopup);
      this._popupComponent.setWatchListClickHandler(this._handleWatchListClick);
      this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
      this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
      this._popupComponent.setDeleteButtonClickHandler(this._handleDeleteButtonClick);
      this._popupComponent.seTaddCommentHandler(this._handleAddComment);
    }
  }

  _handleEscDownRemovePopup() {
    this._handleRemovePopup();
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

  _handleWatchListClick() {
    this._changeData(
        UserAction.UPDATE_LIST,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._filmCardData,
            {
              isInWatchlist: !this._filmCardData.isInWatchlist
            }
        ));
  }

  _handleWatchedClick() {
    this._changeData(
        UserAction.UPDATE_LIST,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._filmCardData,
            {
              isWatched: !this._filmCardData.isWatched,
              watchedTime: dayjs().format(`YYYY/MM/DD HH:mm`)
            }
        ));
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_LIST,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._filmCardData,
            {
              isFavorite: !this._filmCardData.isFavorite
            }
        ));
  }

  _handleDeleteButtonClick(commentIdNumber) {
    const commentId = this._filmCardData.comments.findIndex((comment) => comment.commentId === +commentIdNumber);
    this._changeData(
        UserAction.COMMENT_ACTION,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._filmCardData.comments,
            {
              comments: this._filmCardData.comments.splice(commentId, 1)
            }
        ));
  }

  _handleAddComment(commentValue, emoji) {
    this._changeData(
        UserAction.COMMENT_ACTION,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._filmCardData.comments,
            {
              comments: this._filmCardData.comments.push({
                commentText: commentValue,
                commentDate: dayjs().format(`YYYY/MM/DD HH:mm`),
                emoji: emoji + `.png`
              })
            }
        ));
  }

  destroy() {
    remove(this._filmCardComponent);
  }
}


