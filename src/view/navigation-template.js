import {createElement} from "../utils.js";

const navigationTemplate = () => {

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active" data-status="all">All movies</a>
    <a href="#watchlist" class="main-navigation__item" data-status="watchlist">Watchlist <span class="main-navigation__item-count">10</span></a>
    <a href="#history" class="main-navigation__item" data-status="watched">History <span class="main-navigation__item-count">8</span></a>
    <a href="#favorites" class="main-navigation__item" data-status="favorite">Favorites <span class="main-navigation__item-count">8</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class Navigation {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return navigationTemplate();
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
