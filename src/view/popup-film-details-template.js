import SmartView from "./smart-view.js";
import {siteBodyTag} from "../utils/utils.js";

const popupFilmDetailsTemplate = (film, emojiChoosen) => {
  const {filmCover, ageLimit, filmName, originalFilmName, rating, director, writer, actors, releaseDate: {day, month, year}, duration: {minutes, hours}, country, genre, description, isInWatchlist, isWatched, isFavorite, comments} = film;

  const generateGenre = (genreData) => {
    let genreList = [];
    genreData.forEach((genreItem) => {
      genreList.push(`<span class="film-details__genre">${genreItem}</span>`);
    });

    return genreList.join(``).toString();
  };

  const generateComment = (comment) => {
    let commentList = [];
    comment.forEach((commentItem) => {
      commentList.push(`<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${commentItem.emoji}" width="55" height="55" alt="emoji-${commentItem.emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${commentItem.commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${commentItem.commentAuthor}</span>
          <span class="film-details__comment-day">${commentItem.commentDate.year + `/` + commentItem.commentDate.monthComment + `/` + commentItem.commentDate.day + ` ` + commentItem.commentDate.hour + `:` + commentItem.commentDate.minute}</span>
          <button class="film-details__comment-delete" data-comment-id="${commentItem.commentId}">Delete</button>
        </p>
      </div>
    </li>`);
    });

    return commentList.join(``).toString();
  };

  const addEmoji = (emoji) => {
    if (emoji === null) {
      return ``;
    }
    return `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`;
  };

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${filmCover}" alt="">

          <p class="film-details__age">${ageLimit}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmName}</h3>
              <p class="film-details__title-original">Original: ${originalFilmName}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writer}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${day + ` ` + month + ` ` + year}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${+hours > 0 ? hours + `h` : ``} ${minutes}m</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genre${genre.length > 1 ? `s` : ``}</td>
              <td class="film-details__cell">
                ${generateGenre(genre)}
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchlist === true ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched === true ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite === true ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${generateComment(comments)}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
          ${addEmoji(emojiChoosen)}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class PopupFilmDetails extends SmartView {
  constructor(film) {
    super();
    this._film = film;
    this._emojiChoosen = null;
    this._closePopupHandler = this._closePopupHandler.bind(this);
    this._escDownCloseHandler = this._escDownCloseHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._emojiChoiceHandler = this._emojiChoiceHandler.bind(this);
    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
    this.setInnerHandler();
  }

  getTemplate() {
    return popupFilmDetailsTemplate(this._film, this._emojiChoosen);
  }

  saveScrollPosition() {
    this.getElement().scrollTop = this._scrollTop;
  }

  _closePopupHandler(evt) {
    evt.preventDefault();
    this._callback.closePopupClick();
    siteBodyTag.classList.remove(`hide-overflow`);
  }

  _escDownCloseHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._callback.escKeyDownClose(evt);
      siteBodyTag.classList.remove(`hide-overflow`);
    }
  }

  _watchListClickHandler(evt) {
    this._callback.watchListClick(evt);
  }

  _watchedClickHandler(evt) {
    this._callback.watchedClick(evt);
  }

  _favoriteClickHandler(evt) {
    this._callback.favoriteClick(evt);
  }

  _emojiChoiceHandler(evt) {
    if (evt.target.classList.contains(`film-details__emoji-item`)) {
      this._emojiChoosen = evt.target.value;
      this.updateElement();
    }
  }

  _deleteButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteButtonClick(evt.target.dataset.commentId);
    this.updateElement();
  }

  setClosePopupHandler(callback) {
    this._callback.closePopupClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closePopupHandler);
  }

  setEscDownClosePopupHandler(callback) {
    this._callback.escKeyDownClose = callback;
    document.addEventListener(`keydown`, this._escDownCloseHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchListClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setDeleteButtonClickHandler(callback) {
    this._callback.deleteButtonClick = callback;
    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((button) => (button.addEventListener(`click`, this._deleteButtonClickHandler)));
  }

  setInnerHandler() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiChoiceHandler);
  }

  removeClosePopupHandler() {
    this._callback.closePopupClick = null;
    this.getElement().querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._closePopupHandler);
    document.removeEventListener(`keydown`, this._escDownCloseHandler);
  }

  restoreHandlers() {
    this.setClosePopupHandler(this._callback.closePopupClick);
    this.setEscDownClosePopupHandler(this._callback.escKeyDownClose);
    this.setWatchListClickHandler(this._callback.watchListClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setInnerHandler();
    this.saveScrollPosition();
  }
}
