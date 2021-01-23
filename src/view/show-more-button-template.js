import AbstractView from "./abstract-view.js";

const showMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowMoreButton extends AbstractView {
  constructor() {
    super();
    this._showMoreButtonClickHandler = this._showMoreButtonClickHandler.bind(this);
  }

  getTemplate() {
    return showMoreButtonTemplate();
  }

  _showMoreButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.showMoreButtonClick();
  }

  setClickHandler(callback) {
    this._callback.showMoreButtonClick = callback;
    this.getElement().addEventListener(`click`, this._showMoreButtonClickHandler);
  }
}
