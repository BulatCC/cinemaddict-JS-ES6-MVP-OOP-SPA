import {generateFilm} from "./mock/film-data.js";
import FilmBoard from "./presenter/film-board-presenter.js";
import FilmsModel from "./model/films-model.js";
import FilterModel from "./model/filter-model.js";
import FilterPresenter from "./presenter/filter-presenter.js";
// import dayjs from "dayjs";
// import isBetween from "dayjs/plugin/isBetween";
// import duration from "dayjs/plugin/duration";
// dayjs.extend(isBetween);
// dayjs.extend(duration);

const FILM_CARD_COUNT = 50;
const films = new Array(FILM_CARD_COUNT).fill().map(generateFilm);
console.log(films)

const filterModel = new FilterModel();
const filmsModel = new FilmsModel();

filmsModel.setFilms(films);
const filmBoard = new FilmBoard(filmsModel, filterModel);
const filterPresenter = new FilterPresenter(filterModel, filmsModel, filmBoard);

filterPresenter.init();
filmBoard.init();

// let date = dayjs(`1995-01-18 00:25`).format(`YYYY/MM/DD HH:mm`).toString();
// let now = dayjs().format(`YYYY/MM/DD HH:mm`)
// let between = dayjs('2010-10-19').isBetween('2010-10-19', dayjs('2010-10-25'), null, [])
