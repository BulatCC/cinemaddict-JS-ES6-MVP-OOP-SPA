//import {createSiteMenuTemplate} from "./view/site-menu.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);


//render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);