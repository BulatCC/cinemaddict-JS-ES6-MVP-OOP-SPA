export const navigationTemplate = (isInWatchList, isWatched, isFavorite) => {

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active" data-status="all">All movies</a>
    <a href="#watchlist" class="main-navigation__item" data-status="watchlist">Watchlist <span class="main-navigation__item-count">${isInWatchList.length}</span></a>
    <a href="#history" class="main-navigation__item" data-status="watched">History <span class="main-navigation__item-count">${isWatched.length}</span></a>
    <a href="#favorites" class="main-navigation__item" data-status="favorite">Favorites <span class="main-navigation__item-count">${isFavorite.length}</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};
