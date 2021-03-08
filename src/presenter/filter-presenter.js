import FilterView from "../view/filter-template.js";
import {render, replace} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {siteMainTag, remove} from "../utils/utils.js";
import {FilterType, UpdateType} from "../consts.js";

export default class Filter {
  constructor(filterModel, filmsModel) {
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._filterComponent = null;
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilterType = this._filterModel.getFilter();
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilterType);

    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(siteMainTag, this._filterComponent, `beforeend`);
      return;
    }
    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleFilterTypeChange(evt) {
    if (this._currentFilterType === evt.target.dataset.status) {
      return;
    }
    this._filterModel.setFilter(UpdateType.MAJOR, evt.target.dataset.status);
  }

  _handleModelEvent() {
    this.init();
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return {
      watchlist: filter[FilterType.WATCHLIST](films).length,
      watched: filter[FilterType.WATCHED](films).length,
      favorite: filter[FilterType.FAVORITES](films).length
    };
  }
}
