import dayjs from "dayjs";
import {TimeRangeDuration} from "../consts.js";

export const getWatchedFilms = (films) => {
  return films.filter((film) => film.isWatched === true);
};

export const getTotalDuration = (films) => {
  let minutesCounter = null;
  films.forEach((film) => {
    minutesCounter = minutesCounter + film.duration.minutes + (film.duration.hours * 60);
  });

  const hours = Math.floor(minutesCounter / 60);
  const minutes = minutesCounter % 60;

  return {
    minutes,
    hours
  };
};

export const getWatchedFilmsinRange = (data) => {
  if (data.dateRange === TimeRangeDuration.ALL) {
    return data.watchedFilms;
  }

  return data.watchedFilms.filter((film) => {

    return dayjs(film.watchedTime).isBetween(dayjs(), dayjs().subtract(data.dateRange, `day`));
  });
};

export const getMovieRating = (films) => {
  let rating = [];
  let statistics = {};

  films.forEach((film) => {
    film.genre.forEach((genreName) => {
      rating.push(genreName);
    });
  });

  rating.forEach((film) => {
    if (!statistics[film]) {
      statistics[film] = 1;
    } else {
      statistics[film] = statistics[film] + 1;
    }
  });

  return statistics;
};

export const getTopGenre = (movieRating) => {
  const rating = Object.keys(movieRating);
  let topGenre = ``;
  let topValue = 0;
  rating.forEach((film) => {
    if (movieRating[film] > topValue) {
      topValue = movieRating[film];
      topGenre = film;
    }
  });
  return topGenre;
};

export const statsChart = (rating, data) => {
  const genreNames = Object.entries(rating);

  let ratingArr = [];
  genreNames.forEach((item) => {
    ratingArr.push({filmName: item[0], filmRating: item[1]});
  });

  ratingArr.sort((a, b)=> {
    return b.filmRating - a.filmRating;
  });

  if (data.keys === true) {
    let filmNames = [];
    ratingArr.forEach((item) => {
      filmNames.push(item.filmName);
    });
    return filmNames;
  }

  if (data.values === true) {
    let filmRatingValue = [];
    ratingArr.forEach((item) => {
      filmRatingValue.push(item.filmRating);
    });
    return filmRatingValue;
  }

  return ``;
};
