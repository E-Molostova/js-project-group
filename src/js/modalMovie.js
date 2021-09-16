import { api, preparingData } from './gallery';
import makeMoviesById from '../templates/modalMovie.hbs';
import refs from './refs';

let currentMov = null;
const bodyRef = document.querySelector('body');

// listners
refs.galleryList.addEventListener('click', openModal);
refs.modalMovieWindowClsBtn.addEventListener('click', closeModal);
refs.backdrop.addEventListener('click', closeModalBackdropClick);

async function openModal(evt) {
  let movieId = evt.target.closest('LI').id;
  // if (evt.currentTarget !== evt.target) return false
  await getMoviesById(movieId);
  console.log(movieId);
  console.log(currentMov);
  // checkInLS(currentMov);
  clearModalContent();
  showModalContent();
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
      renderModalContent(data);
    })
    .catch(err => {
      console.log(err.message);
    });
}

let watchedBtnRef;
let queueBtnRef;

function renderModalContent(results) {
  const normilizedResult = preparingData(results);
  currentMov = normilizedResult;
  const markup = makeMoviesById(normilizedResult);
  refs.modalContent.innerHTML = markup;
  watchedBtnRef = document.querySelector('.js-modal-watched');
  queueBtnRef = document.querySelector('.js-modal-queue');
  watchedBtnRef.addEventListener('click', onWatchedBtnClick);
  queueBtnRef.addEventListener('click', onQueueBtnClick);
}

// function preventAction(evt) {
//   evt.preventDefault();
// }

function clearModalContent() {
  api.movId = 0;
  refs.modalContent.innerHTML = '';
}

// close modal fn
function closeModal() {
  refs.backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', closeModalEsc);
  bodyRef.classList.toggle('no-scroll');
  // addToWatched(currentMov);
  // addToQueue(currentMov);
  // removeFromWatched(currentMov);
  // removeFromQueue(currentMov);
  // console.log(currentMov);
  // checkInLS(currentMov);
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

// modal btns

function makeRemoveFromWatchedBtn() {
  watchedBtnRef.innerHTML = 'Remove from watched';
  watchedBtnRef.setAttribute('data-action', 'remove');
}
function makeRemoveFromQueueBtn() {
  queueBtnRef.innerHTML = 'Remove from queue';
  queueBtnRef.setAttribute('data-action', 'remove');
}
function makeAddToWatchedBtn() {
  watchedBtnRef.innerHTML = 'Add to watched';
  watchedBtnRef.setAttribute('data-action', 'add');
}
function makeAddToQueueBtn() {
  queueBtnRef.innerHTML = 'Add to queue';
  queueBtnRef.setAttribute('data-action', 'add');
}
function checkWatchedBtnStatus() {
  return watchedBtnRef.getAttribute('data-action');
}
function checkQueueBtnStatus() {
  return queueBtnRef.getAttribute('data-action');
}

// refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
// refs.queueBtn.addEventListener('click', onQueueBtnClick);

function onWatchedBtnClick() {
  const dataActionStatus = checkWatchedBtnStatus();
  console.log(dataActionStatus);
  if (dataActionStatus === 'add') {
    addToWatched(currentMov);
    makeRemoveFromWatchedBtn();
    watchedBtnRef.classList.add('active-btn');
  }
  if (dataActionStatus === 'remove') {
    removeFromWatched(currentMov);
    makeAddToWatchedBtn();
    watchedBtnRef.classList.remove('active-btn');
  }
}

function onQueueBtnClick() {
  const dataActionStatus = checkQueueBtnStatus();
  console.log(dataActionStatus);
  if (dataActionStatus === 'add') {
    addToQueue(currentMov);
    makeRemoveFromQueueBtn();
    queueBtnRef.classList.add('active-btn');
  }
  if (dataActionStatus === 'remove') {
    removeFromQueue(currentMov);
    makeAddToQueueBtn();
    queueBtnRef.classList.remove('active-btn');
  }
}

// function currentWatchBtnStatus(currentMov) {
//   if()
// }

// function currentQueueBtnStatus() {

// }

function getWatched() {
  const savedMovies = localStorage.getItem('watched');
  return savedMovies ? JSON.parse(savedMovies) : [];
}

function putWatched(array) {
  localStorage.setItem('watched', JSON.stringify(array));
}

const addItem = (currentCard, array) => {
  const filtered = array.filter(item => item.id !== currentCard.id);
  return [...filtered, currentCard];
};

function addToWatched(item) {
  const parsedMovies = getWatched();
  const ite = item;
  const newArray = addItem(ite, parsedMovies);
  putWatched(newArray);
}

const removeItem = (currentCard, array) => {
  return array.filter(item => item.id !== currentCard.id);
};

function removeFromWatched(item) {
  const parsedMovies = getWatched();
  const ite = item;
  const newArray = removeItem(ite, parsedMovies);
  putWatched(newArray);
}

// function getWatched() {
//   const savedMovies = localStorage.getItem('watched');
//   return savedMovies ? JSON.parse(savedMovies) : [];
// }
function putWatched(array) {
  localStorage.setItem('watched', JSON.stringify(array));
}

function getQueue() {
  const savedMovies = localStorage.getItem('queue');
  return savedMovies ? JSON.parse(savedMovies) : [];
}
function putQueue(array) {
  localStorage.setItem('queue', JSON.stringify(array));
}

function addToQueue(item) {
  const parsedMovies = getQueue();
  const ite = item;
  const newArray = addItem(ite, parsedMovies);
  putQueue(newArray);
}
function removeFromQueue(item) {
  const parsedMovies = getQueue();
  const ite = item;
  const newArray = removeItem(ite, parsedMovies);
  putQueue(newArray);
}

const checkInLS = currentCard => {
  const watched = getWatched();
  // console.log(watched);
  watched.some(item => {
    if (item.id === currentCard.id) {
      makeRemoveFromWatchedBtn();
      console.log('Светится первая кнопка');
    } else {
      makeAddToWatchedBtn();
    }
  });
  const queue = getQueue();
  queue.some(item => {
    if (item.id === currentCard.id) {
      makeRemoveFromQueueBtn();
      console.log('Светится вторая кнопка');
    } else {
      makeAddToQueueBtn();
    }
  });
};

export { getWatched, getQueue }