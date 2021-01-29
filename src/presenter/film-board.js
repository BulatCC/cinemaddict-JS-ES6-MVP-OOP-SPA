import {render} from "../utils/render.js";
import {siteHeaderTag, siteMainTag, moviesNumberInDB, remove, updateItem, sortByDate, sortByRating} from "../utils/utils.js";
import {SortType} from "../consts.js";
import UserProfile from "../view/user-profile-template.js";
import NavigationView from "../view/navigation-template.js";
import SortView from "../view/sort-template.js";
import FilmSectionView from "../view/film-section-template.js";
import ShowMoreButtonView from "../view/show-more-button-template.js";
import MoviesNumberView from "../view/movies-number-template.js";
import NoFilmsView from "../view/no-films-template.js";
import Film from "../presenter/film.js";

const FILM_CARD_COUNT_PER_STEP = 5;

export default class FilmBoard {
  constructor() {
    this._filmPresenter = {}; // тут должны храниться презентеры, чтобы иметь возможность удалить их
    this._renderedFilmCount = FILM_CARD_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._navigationComponent = new NavigationView();
    this._userProfileComponent = new UserProfile();
    this._sortViewComponent = new SortView();
    this._filmSectionComponent = new FilmSectionView();
    this._moviesNumberComponent = new MoviesNumberView();
    this._noFilmsComponent = new NoFilmsView();
    this._loadMoreButtonComponent = new ShowMoreButtonView();
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(filmsData) {
    this._filmsDefaultSort = filmsData;
    this._films = filmsData.slice();
    this._renderUserProfile();
    this._renderNavigation();
    if (filmsData.length !== 0) {
      this._renderSort();
      this._renderFilmSection();
      this._renderFilmsList();
    } else {
      this._renderNoFilms();
    }
    this._renderMoviesNumber();
  }

  _renderUserProfile() {
    render(siteHeaderTag, this._userProfileComponent, `beforeend`);
  }

  _renderNavigation() {
    render(siteMainTag, this._navigationComponent, `beforeend`);
  }

  _renderSort() {
    render(siteMainTag, this._sortViewComponent, `beforeend`);
    this._sortViewComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmSection() {
    render(siteMainTag, this._filmSectionComponent, `beforeend`);
  }

  _renderFilm(film) {
    const filmPresenter = new Film(this._handleFilmChange);
    let filmsContainer = this._filmSectionComponent._element.querySelector(`.films-list__container`);
    filmPresenter.init(filmsContainer, film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((boardTask) => this._renderFilm(boardTask));
  }

  _renderFilmsList() {
    this._renderFilms(0, FILM_CARD_COUNT_PER_STEP);

    if (this._films.length > FILM_CARD_COUNT_PER_STEP) {
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

  _renderNoFilms() {
    render(siteMainTag, this._noFilmsComponent, `beforeend`);
  }

  _handleLoadMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_CARD_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_CARD_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILM_CARD_COUNT_PER_STEP;
    remove(this._loadMoreButtonComponent);
  }

  _sortFilms(sortType) {
    const currentSort = [...this._filmsDefaultSort];
    this._currentSortType = sortType;

    if (sortType === SortType.DEFAULT) {
      this._films = currentSort;
    }

    if (sortType === SortType.DATE) {
      this._films.sort(sortByDate);
    }

    if (sortType === SortType.RATING) {
      this._films.sort(sortByRating);
    }
  }

  _handleSortTypeChange(sortType) {
    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmsList();
  }
}
