import api from './api-service';
import { preparingData } from './gallery';
import makeMoviesById from '../templates/modalMovie.hbs';
import refs from './refs';
import { onLibWatchBtn, onLibQueueBtn } from './library';

let currentMov = null;
const bodyRef = document.querySelector('body');

// listners
refs.galleryList.addEventListener('click', openModal);
refs.modalMovieWindowClsBtn.addEventListener('click', closeModal);
refs.backdrop.addEventListener('click', closeModalBackdropClick);

async function openModal(evt) {
  if (evt.target.parentNode !== evt.target.closest('LI')) return;
  const movieId = evt.target.closest('LI').id;
  await getMoviesById(movieId);
  clearModalContent();
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
      showModalContent();
      checkInLS(currentMov);
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

function clearModalContent() {
  api.movId = 0;
  refs.modalContent.innerHTML = '';
}

// close modal fn
function closeModal() {
  refs.backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', closeModalEsc);
  bodyRef.classList.toggle('no-scroll');
  
  if (refs.btnHome.classList.contains('active') && refs.pageLibrary.classList.contains('current')) {
    onLibWatchBtn();
  }
  if (
    refs.btnLibrary.classList.contains('active') &&
    refs.pageLibrary.classList.contains('current')
  ) {
    onLibQueueBtn();
  }
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
  watchedBtnRef.classList.add('active-btn');
}
function makeRemoveFromQueueBtn() {
  queueBtnRef.innerHTML = 'Remove from queue';
  queueBtnRef.setAttribute('data-action', 'remove');
  queueBtnRef.classList.add('active-btn');
}
function makeAddToWatchedBtn() {
  console.log(watchedBtnRef);
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
  const isInWatched = watched.some(item => item.id === currentCard.id);
  if (isInWatched) {
    makeRemoveFromWatchedBtn();
  } else {
    makeAddToWatchedBtn();
  }

  const queue = getQueue();
  const isInQueue = queue.some(item => item.id === currentCard.id);
  if (isInQueue) {
    makeRemoveFromQueueBtn();
  } else {
    makeAddToQueueBtn();
  }
};

export { getWatched, getQueue };
