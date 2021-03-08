import {render, replace} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {siteHeaderTag, siteMainTag, moviesNumberInDB, remove, sortByDate, sortByRating} from "../utils/utils.js";
import {SortType, UserAction, UpdateType, FilterType} from "../consts.js";
import UserProfile from "../view/user-profile-template.js";
import FilterView from "../view/filter-template.js";
import SortView from "../view/sort-template.js";
import FilmSectionView from "../view/film-section-template.js";
import ShowMoreButtonView from "../view/show-more-button-template.js";
import MoviesNumberView from "../view/movies-number-template.js";
import NoFilmsView from "../view/no-films-template.js";
import Film from "./film-presenter.js";

const FILM_CARD_COUNT_PER_STEP = 5;

export default class FilmBoard {
  constructor(filmsModel, filterModel) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._filmPresenter = {}; // тут должны храниться презентеры, чтобы иметь возможность удалить их
    this._renderedFilmCount = FILM_CARD_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._userProfileComponent = new UserProfile();
    this._filmSectionComponent = new FilmSectionView();
    this._moviesNumberComponent = new MoviesNumberView();
    this._noFilmsComponent = new NoFilmsView();
    this._loadMoreButtonComponent = new ShowMoreButtonView();
    this._filterViewComponent = new FilterView();
    this._sortViewComponent = null;
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filmNumber = this._filmsModel.getFilms().length;
    this._renderUserProfile();
    this._renderSort();
    this._renderFilmSection(filmNumber);
    this._renderNoFilms(filmNumber);
    this._renderFilmsList();
    this._renderMoviesNumber();
  }

  _getFilms() {
    const currentFilter = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms().slice();
    let sortedFilms = films;

    if (currentFilter !== FilterType.ALL) {
      sortedFilms = filter[currentFilter](films);
    }

    if (this._currentSortType === SortType.DEFAULT) {
      return sortedFilms;
    }

    if (this._currentSortType === SortType.DATE) {
      return sortedFilms.sort(sortByDate);
    }

    if (this._currentSortType === SortType.RATING) {
      return sortedFilms.sort(sortByRating);
    }

    return sortedFilms;
  }

  _renderUserProfile() {
    render(siteHeaderTag, this._userProfileComponent, `beforeend`);
  }

  _renderSort() {
    const filmsCount = this._filmsModel.getFilms().length;
    if (filmsCount === 0) {
      return;
    }
    const prevSortComponent = this._sortViewComponent;
    this._sortViewComponent = new SortView(this._currentSortType);
    this._sortViewComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    if (prevSortComponent === null) {
      render(siteMainTag, this._sortViewComponent, `beforeend`);
      return;
    }
    replace(this._sortViewComponent, prevSortComponent);
    remove(prevSortComponent);
  }

  _renderFilmSection(filmNumber) {
    if (filmNumber === 0) {
      return;
    }
    render(siteMainTag, this._filmSectionComponent, `beforeend`);
  }

  _renderFilm(film) {
    const filmPresenter = new Film(this._handleViewAction, this._filmsModel);
    let filmsContainer = this._filmSectionComponent._element.querySelector(`.films-list__container`);
    filmPresenter.init(filmsContainer, film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderFilmsList() {
    const filmCount = this._getFilms().length;
    let films = this._getFilms().slice(0, Math.min(filmCount, this._renderedFilmCount));
    this._renderFilms(films);

    if (filmCount > this._renderedFilmCount) {
      this._renderLoadMoreButton();
    }
  }

  _renderMoviesNumber() {
    render(moviesNumberInDB, this._moviesNumberComponent, `beforeend`);
  }

  _renderLoadMoreButton() {
    let filmsContainer = this._filmSectionComponent._element.querySelector(`.films-list__container`);
    render(filmsContainer, this._loadMoreButtonComponent, `afterbegin`);

    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderNoFilms(filmNumber) {
    if (filmNumber === 0) {
      render(siteMainTag, this._noFilmsComponent, `beforeend`);
    }
  }

  _handleLoadMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_CARD_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);
    this._renderFilms(films);
    this._renderedFilmCount += FILM_CARD_COUNT_PER_STEP;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _clearFilmList(resetRenderedFilmCount) {
    const filmCount = this._getFilms().length;
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_CARD_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    remove(this._loadMoreButtonComponent);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._handleViewAction(UserAction.SORT_CHANGE);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_LIST:
        this._filmsModel.updateFilm(updateType, update);
        this._clearFilmList(false);
        this._renderFilmsList();
        break;
      case UserAction.SORT_CHANGE:
        this._clearFilmList(true);
        this._renderFilmsList();
        this._renderSort();
        break;
      case UserAction.FILTER_CHANGE:
        break;
      case UserAction.DELETE_COMMENT:
        this._clearFilmList(false);
        this._renderFilmsList();
        break;
    }
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.PATCH:
        break;
      case UpdateType.MINOR:

        break;
      case UpdateType.MAJOR:
        this._clearFilmList(true);
        this._renderFilmsList();
        break;
    }
  }
}
