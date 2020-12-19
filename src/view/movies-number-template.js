import {createElement} from "../utils.js";

export const moviesNumberTempalte = () => {
  return `<p>130 291 movies inside</p>`;
};

export default class MoviesNumber {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return moviesNumberTempalte();
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
