import {FilterType} from "../consts.js";

export const filter = {
  [FilterType.ALL]: (films) => {
    return films;
  },
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist === true),
  [FilterType.WATCHED]: (films) => films.filter((film) => film.isWatched === true),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite === true)
};
