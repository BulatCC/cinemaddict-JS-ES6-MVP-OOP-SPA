import AbstractView from "./abstract-view.js";

export const moviesNumberTempalte = () => {
  return `<p>130 291 movies inside</p>`;
};

export default class MoviesNumber extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return moviesNumberTempalte();
  }
}
