import {generateFilm} from "./mock/film-data.js";
import FilmBoard from "./presenter/film-board.js";

const FILM_CARD_COUNT = 7;
const films = new Array(FILM_CARD_COUNT).fill().map(generateFilm);

new FilmBoard().init(films);
