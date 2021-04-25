export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

export const UserAction = {
  UPDATE_LIST: `UPDATE_LIST`,
  SORT_CHANGE: `SORT_CHANGE`,
  FILTER_CHANGE: `FILTER_CHANGE`,
  COMMENT_ACTION: `COMMENT_ACTION`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterType = {
  ALL: `ALL`,
  WATCHLIST: `WATCHLIST`,
  WATCHED: `WATCHED`,
  FAVORITES: `FAVORITES`,
  STATS: `STATS`
};

export const isStatsRendered = {
  TRUE: true,
  FALSE: false
};

export const TimeRangeDuration = {
  ALL: 0,
  TODAY: 1,
  WEEK: 6,
  MONTH: 30,
  YEAR: 365
};

export const TimeRange = {
  ALL: `ALL`,
  TODAY: `TODAY`,
  WEEK: `WEEK`,
  MONTH: `MONTH`,
  YEAR: `YEAR`
};
