import { api, preparingData } from './gallery';
import makeMoviesById from '../templates/modalMovie.hbs';
import refs from './refs';
let currentMov = [];
let renewSavedMovies = [];
const bodyRef = document.querySelector('body');
// console.log(bodyRef);

// listners
refs.galleryList.addEventListener('click', openModal);
refs.modalMovieWindowClsBtn.addEventListener('click', closeModal);
refs.backdrop.addEventListener('click', closeModalBackdropClick);

let movie = null;
async function openModal(evt) {
  let movieId = evt.target.closest('LI').id;
  // console.log(movieId);
  clearModalContent();
  showModalContent();
  let movie = await getMoviesById(movieId);
}

function showModalContent() {
  bodyRef.classList.toggle('no-scroll');
  refs.modalMovieWindow.classList.remove('is-hidden');
  window.addEventListener('keydown', closeModalEsc);
}

function getMoviesById(id) {
  api.movId = id;
  api
    .fetchMovieById()
    .then(data => {
      // console.log(data);
      renderModalContent(data);
    })
    .catch(err => {
      console.log(err.message);
    });
}

function renderModalContent(results) {
  const normilizedResult = preparingData(results);
  // console.log(normilizedResult);
  currentMov = [];
  currentMov.push(normilizedResult);
  console.log(currentMov);
  const markup = makeMoviesById(normilizedResult);
  refs.modalContent.innerHTML = markup;
}

function preventAction(evt) {
  evt.preventDefault();
}

function clearModalContent() {
  api.movId = 0;
  refs.modalContent.innerHTML = '';
}

// close modal fn
function closeModal() {
  refs.backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', closeModalEsc);
  bodyRef.classList.toggle('no-scroll');
  addToWatched(currentMov);
  // addToQueue(currentMov);
  // removeFromWatched(currentMov);
  console.log(currentMov);
}

function closeModalBackdropClick(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal();
  }
  return;
}

function closeModalEsc(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
  return;
}

const checkId = (i, p) => {
  p.forEach(element => {
    if (element.id !== i.id) {
      renewSavedMovies.push(element);
    }
  });
  renewSavedMovies.push(i);
};

function getWatched() {
  const savedMovies = localStorage.getItem('watched');
  return JSON.parse(savedMovies);
}
function putWatched() {
  localStorage.removeItem('watched');
  localStorage.setItem('watched', JSON.stringify(renewSavedMovies));
  renewSavedMovies = [];
}
function getQueue() {
  const savedMovies = localStorage.getItem('queue');
  return JSON.parse(savedMovies);
}
function putQueue() {
  localStorage.removeItem('queue');
  localStorage.setItem('queue', JSON.stringify(renewSavedMovies));
  renewSavedMovies = [];
}

function addToQueue([item]) {
  const parsedMovies = getQueue();
  const ite = item;
  checkId(ite, parsedMovies);
  putQueue();
}

function removeFromQueue([item]) {
  const parsedMovies = getQueue();
  const ite = item;
  checkIdInLS(ite, parsedMovies);
  putQueue();
}

function addToWatched([item]) {
  // const savedMovies = localStorage.getItem('watched');
  // const parsedMovies = JSON.parse(savedMovies);
  const parsedMovies = getWatched();
  const ite = item;
  checkId(ite, parsedMovies);
  putWatched();
  // localStorage.removeItem('watched');
  // localStorage.setItem('watched', JSON.stringify(renewSavedMovies));
  // renewSavedMovies = [];
}

const checkIdInLS = (i, p) => {
  p.forEach(element => {
    if (element.id !== i.id) {
      renewSavedMovies.push(element);
    }
  });
};
function removeFromWatched([item]) {
  // const savedMovies = localStorage.getItem('watched');
  // const parsedMovies = JSON.parse(savedMovies);
  const parsedMovies = getWatched();
  const ite = item;
  checkIdInLS(ite, parsedMovies);
  putWatched();
  // console.log(renewSavedMovies);
  // localStorage.removeItem('watched');
  // localStorage.setItem('watched', JSON.stringify(renewSavedMovies));
  // renewSavedMovies = [];
}

// function addToQueue(item) {
//   const savedMovies = localStorage.getItem('queue');
//   const parsedMovies = JSON.parse(savedMovies);
//   const renewSavedMovies = [...parsedMovies, ...item];
//   localStorage.removeItem('queue');
//   localStorage.setItem('queue', JSON.stringify(renewSavedMovies));
// }

const queue = [
  {
    adult: false,
    backdrop_path: '/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg',
    belongs_to_collection: null,
    budget: 63000000,
    genres: [
      {
        id: 18,
        name: 'Drama',
      },
    ],
    homepage: '',
    id: 550,
    imdb_id: 'tt0137523',
    original_language: 'en',
    original_title: 'Fight Club',
    overview:
      'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
    popularity: 0.5,
    poster_path: null,
    production_companies: [
      {
        id: 508,
        logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png',
        name: 'Regency Enterprises',
        origin_country: 'US',
      },
      {
        id: 711,
        logo_path: null,
        name: 'Fox 2000 Pictures',
        origin_country: '',
      },
      {
        id: 20555,
        logo_path: null,
        name: 'Taurus Film',
        origin_country: '',
      },
      {
        id: 54050,
        logo_path: null,
        name: 'Linson Films',
        origin_country: '',
      },
      {
        id: 54051,
        logo_path: null,
        name: 'Atman Entertainment',
        origin_country: '',
      },
      {
        id: 54052,
        logo_path: null,
        name: 'Knickerbocker Films',
        origin_country: '',
      },
      {
        id: 25,
        logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png',
        name: '20th Century Fox',
        origin_country: 'US',
      },
    ],
    production_countries: [
      {
        iso_3166_1: 'US',
        name: 'United States of America',
      },
    ],
    release_date: '1999-10-12',
    revenue: 100853753,
    runtime: 139,
    spoken_languages: [
      {
        iso_639_1: 'en',
        name: 'English',
      },
    ],
    status: 'Released',
    tagline: "How much can you know about yourself if you've never been in a fight?",
    title: 'Fight Club',
    video: false,
    vote_average: 7.8,
    vote_count: 3439,
  },
];
// localStorage.removeItem('watched');
// localStorage.setItem('watched', JSON.stringify(queue));

// const savedSettings = localStorage.getItem('watched');
// const parsedSettings = JSON.parse(savedSettings);

// console.log(parsedSettings);
// const savedMovies = localStorage.getItem('watched');
// const parsedMovies = JSON.parse(savedMovies);
// console.log(parsedMovies);
