import AbstractView from "./abstract-view.js";

export const moviesNumberTempalte = (moviesNumber) => {
  return `<p>${moviesNumber} movies inside</p>`;
};

export default class MoviesNumber extends AbstractView {
  constructor(moviesNumber) {
    super();
    this._moviesNumber = moviesNumber;
  }

  getTemplate() {
    return moviesNumberTempalte(this._moviesNumber);
  }
}
