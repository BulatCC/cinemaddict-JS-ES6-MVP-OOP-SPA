import AbstractView from "./abstract-view.js";
import {FilterType} from "../consts.js";

const filterTemplate = (currentFilterType, filterNumber) => {

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item ${currentFilterType === FilterType.ALL ? `main-navigation__item--active` : ``} " data-status="ALL">All movies</a>
    <a href="#watchlist" class="main-navigation__item ${currentFilterType === FilterType.WATCHLIST ? `main-navigation__item--active` : ``} " data-status="WATCHLIST">Watchlist <span class="main-navigation__item-count">${filterNumber.watchlist}</span></a>
    <a href="#history" class="main-navigation__item ${currentFilterType === FilterType.WATCHED ? `main-navigation__item--active` : ``} " data-status="WATCHED">Watched <span class="main-navigation__item-count">${filterNumber.watched}</span></a>
    <a href="#favorites" class="main-navigation__item ${currentFilterType === FilterType.FAVORITES ? `main-navigation__item--active` : ``} " data-status="FAVORITES">Favorites <span class="main-navigation__item-count">${filterNumber.favorite}</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional ${currentFilterType === FilterType.STATS ? `main-navigation__item--active` : ``} " data-status="STATS">Stats</a>
</nav>`;
};

export default class Filter extends AbstractView {
  constructor(filterNumber, currentFilterType) {
    super();
    this._filterNumber = filterNumber;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return filterTemplate(this._currentFilterType, this._filterNumber);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(evt);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
