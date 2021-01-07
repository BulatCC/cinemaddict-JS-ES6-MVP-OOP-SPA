import AbstractView from "./abstract-view.js";

const noFilmsTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class NoFilms extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return noFilmsTemplate();
  }
}
