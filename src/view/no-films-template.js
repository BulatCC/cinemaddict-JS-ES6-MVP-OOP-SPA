import {createElement} from "../utils.js";

const noFilmsTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class NoFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return noFilmsTemplate();
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
