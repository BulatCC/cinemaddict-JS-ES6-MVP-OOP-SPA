import Smart from "./smart-view.js";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {getWatchedFilms, getTotalDuration, getWatchedFilmsinRange, getMovieRating, getTopGenre, statsChart} from "../utils/stats.js";
import {TimeRangeDuration, TimeRange} from "../consts.js";

dayjs.extend(duration);
dayjs.extend(isBetween);

const BAR_HEIGHT = 50;

const createStatsChart = (statisticCtx, filmsRating) => {
  statisticCtx.height = BAR_HEIGHT * 5;
  const filmNames = statsChart(filmsRating, {keys: true});
  const filmRating = statsChart(filmsRating, {values: true});

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: filmNames,
      datasets: [{
        data: filmRating,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const statsTemplate = (data) => {
  const watchedFilmsInRange = getWatchedFilmsinRange(data);
  const watchedTotalDuration = getTotalDuration(watchedFilmsInRange);
  const topGenre = getTopGenre(getMovieRating(watchedFilmsInRange));

  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">Sci-Fighter</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="ALL"
    ${data.currentRange === TimeRange.ALL ? `checked` : ``}>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="TODAY"
    ${data.currentRange === TimeRange.TODAY ? `checked` : ``}>
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="WEEK"
    ${data.currentRange === TimeRange.WEEK ? `checked` : ``}>
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="MONTH"
    ${data.currentRange === TimeRange.MONTH ? `checked` : ``}>
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="YEAR"
    ${data.currentRange === TimeRange.YEAR ? `checked` : ``}>
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${watchedFilmsInRange.length}<span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${watchedTotalDuration.hours} <span class="statistic__item-description">h</span> ${watchedTotalDuration.minutes} <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${topGenre}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

</section>`;
};

export default class Stats extends Smart {
  constructor(films) {
    super();
    this._dateChangeHandler = this._dateChangeHandler.bind(this);
    this._filmsChart = null;
    this._watchedFilms = getWatchedFilms(films);

    this._data = {
      currentRange: TimeRange.ALL,
      dateRange: TimeRangeDuration.ALL,
      watchedFilms: this._watchedFilms
    };

    this._setChart();
    this._statsClickHandler();
  }

  getTemplate() {
    return statsTemplate(this._data);
  }

  _dateChangeHandler(evt) {
    let watchedFilmsInPeriod = null;

    switch (evt.target.value) {
      case `ALL`:
        this._data.currentRange = TimeRange.ALL;
        this._data.dateRange = TimeRangeDuration.ALL;
        this._data.watchedFilms = this._watchedFilms;
        break;
      case `TODAY`:
        this._data.currentRange = TimeRange.TODAY;
        this._data.dateRange = TimeRangeDuration.TODAY;
        this._data.watchedFilms = this._watchedFilms;
        watchedFilmsInPeriod = getWatchedFilmsinRange(this._data);
        this._data.watchedFilms = watchedFilmsInPeriod;
        break;
      case `WEEK`:
        this._data.currentRange = TimeRange.WEEK;
        this._data.dateRange = TimeRangeDuration.WEEK;
        this._data.watchedFilms = this._watchedFilms;
        watchedFilmsInPeriod = getWatchedFilmsinRange(this._data);
        this._data.watchedFilms = watchedFilmsInPeriod;
        break;
      case `MONTH`:
        this._data.currentRange = TimeRange.MONTH;
        this._data.dateRange = TimeRangeDuration.MONTH;
        this._data.watchedFilms = this._watchedFilms;
        watchedFilmsInPeriod = getWatchedFilmsinRange(this._data);
        this._data.watchedFilms = watchedFilmsInPeriod;
        break;
      case `YEAR`:
        this._data.currentRange = TimeRange.YEAR;
        this._data.dateRange = TimeRangeDuration.YEAR;
        this._data.watchedFilms = this._watchedFilms;
        watchedFilmsInPeriod = getWatchedFilmsinRange(this._data);
        this._data.watchedFilms = watchedFilmsInPeriod;
        break;
    }

    this.updateElement();
  }

  restoreHandlers() {
    this._statsClickHandler();
    this._setChart();
  }

  _statsClickHandler() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, this._dateChangeHandler);
  }

  _setChart() {
    const filmsCanvas = this.getElement().querySelector(`.statistic__chart`);
    const filmRating = getMovieRating(getWatchedFilmsinRange(this._data));
    this._filmsChart = createStatsChart(filmsCanvas, filmRating);
  }
}
