import dayjs from "dayjs";
import {getRandomInteger, getRandomElements} from "../utils/utils.js";

const FILM_COVERS = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];
const FILM_NAMES = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`, `Santa Claus Conquers the Martians`, `Popeye the Sailor Meets Sindbad the Sailo`];
const ORIGINAL_FILM_NAMES = [`The Dance of Death`, `Sagebrush Trail`, `The Woman with the Silver Head`, `Darth Vader Conquers the Eathlings`, `Pusheye the Driver Meets Sindgood the Derevolaz`];
const DIRECTOR = [`Anthony Mann`, `John Deer`, `Alan Wake`, `Charlie Chaplin`, `Gorge Fisher`];
const WRITERS = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`, `Gergard Hast`, `Hasturan Strider`];
const ACTORS = [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`, `Sasha Gray`];
const COUNTRIES = [`USSR`, `USA`, `North Korea`];
const GENRES = [`Drama`, `Film-Noir`, `Mystery`];
const DESCRIPTION = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`];
const EMOJI = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`];
const COMMENT_TEXT = [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`, `Cool picture`];
const COMMENT_AUTHOR = [`Ivan`, `Hitler`, `Vasya`, `Bethoven`, `Cannibal`];

const generateDate = () => {
  const minute = getRandomInteger(0, 59).toString();
  const hour = getRandomInteger(0, 23).toString();
  const day = getRandomInteger(1, 30).toString();
  const month = getRandomInteger(0, 11).toString();
  const year = getRandomInteger(1970, 2020).toString();
  const randomDate = dayjs(year + month + day + hour + `:` + minute);

  return {
    minute: randomDate.format(`mm`),
    hour: randomDate.format(`HH`),
    day: randomDate.format(`DD`),
    month: randomDate.format(`MMMM`),
    monthComment: randomDate.format(`MM`),
    year: randomDate.format(`YYYY`)
  };
};

const generateComment = () => {
  let comments = [];
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    comments.push({
      emoji: EMOJI[getRandomInteger(0, EMOJI.length - 1)],
      commentText: COMMENT_TEXT[getRandomInteger(0, COMMENT_TEXT.length - 1)],
      commentAuthor: COMMENT_AUTHOR[getRandomInteger(0, COMMENT_AUTHOR.length - 1)],
      commentDate: generateDate(),
      commentId: getRandomInteger(0, 100000)
    });
  }

  return comments;
};

const generateFilm = () => {
  return {
    filmCover: FILM_COVERS[getRandomInteger(0, FILM_COVERS.length - 1)],
    filmName: FILM_NAMES[getRandomInteger(0, FILM_NAMES.length - 1)],
    originalFilmName: ORIGINAL_FILM_NAMES[getRandomInteger(0, ORIGINAL_FILM_NAMES.length - 1)],
    rating: getRandomInteger(1, 9) + `.` + getRandomInteger(1, 9),
    director: DIRECTOR[getRandomInteger(0, DIRECTOR.length - 1)],
    writer: getRandomElements(WRITERS, true),
    actors: getRandomElements(ACTORS, true),
    releaseDate: generateDate(),
    duration: {
      minutes: getRandomInteger(0, 59),
      hours: getRandomInteger(0, 3)
    },
    country: getRandomElements(COUNTRIES, true),
    genre: getRandomElements(GENRES),
    description: getRandomElements(DESCRIPTION, true),
    ageLimit: getRandomInteger(0, 18),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    comments: generateComment(),
    id: getRandomInteger(0, 1000)
  };
};

export {generateFilm};
