export const render = (container, element, place) => {
  if (place === `beforeend`) {
    container.append(element);
  } else {
    container.after(element);
  }
};
