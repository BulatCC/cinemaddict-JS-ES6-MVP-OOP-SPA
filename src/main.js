import {generateFilm} from "./mock/film-data.js";
import FilmBoard from "./presenter/film-board-presenter.js";
import FilmsModel from "./model/films-model.js";
import FilterModel from "./model/filter-model.js";
import FilterPresenter from "./presenter/filter-presenter.js";

const FILM_CARD_COUNT = 13;
const films = new Array(FILM_CARD_COUNT).fill().map(generateFilm);

const filterModel = new FilterModel();
const filmsModel = new FilmsModel();
const filterPresenter = new FilterPresenter(filterModel, filmsModel);
filmsModel.setFilms(films);
filterPresenter.init();

const filmBoard = new FilmBoard(filmsModel, filterModel);

filmBoard.init();

