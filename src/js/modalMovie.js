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
let watchedBtnRef;
let queueBtnRef;

function renderModalContent(results) {
  const normilizedResult = preparingData(results);
  // console.log(normilizedResult);
  currentMov = [];
  currentMov.push(normilizedResult);
  console.log(currentMov);
  const markup = makeMoviesById(normilizedResult);
  refs.modalContent.innerHTML = markup;
  watchedBtnRef = document.querySelector('.js-modal-watched');
  queueBtnRef = document.querySelector('.js-modal-queue');
  watchedBtnRef.addEventListener('click', onWatchedBtnClick);
  queueBtnRef.addEventListener('click', onQueueBtnClick);
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
  if (dataActionStatus !== 'add') {
    makeRemoveFromWatchedBtn();
    watchedBtnRef.classList.add('active-btn');
  }
  if (dataActionStatus === 'remove') {
    makeAddToWatchedBtn();
    watchedBtnRef.classList.remove('active-btn');
  }
}

function onQueueBtnClick() {
  const dataActionStatus = checkQueueBtnStatus();
  console.log(dataActionStatus);
  if (dataActionStatus !== 'add') {
    makeRemoveFromQueueBtn();
    queueBtnRef.classList.add('active-btn');
  }
  if (dataActionStatus === 'remove') {
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

function addToWatched([item]) {
  const parsedMovies = getWatched();
  const ite = item;
  const newArray = addItem(ite, parsedMovies);
  putWatched(newArray);
}

const removeItem = (currentCard, array) => {
  return array.filter(item => item.id !== currentCard.id);
};

function removeFromWatched([item]) {
  const parsedMovies = getWatched();
  const ite = item;
  const newArray = removeItem(ite, parsedMovies);
  putWatched(newArray);
}

function getWatched() {
  const savedMovies = localStorage.getItem('watched');
  return savedMovies ? JSON.parse(savedMovies) : [];
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

function addToQueue([item]) {
  const parsedMovies = getQueue();
  const ite = item;
  const newArray = addItem(ite, parsedMovies);
  putQueue(newArray);
}
function removeFromQueue([item]) {
  const parsedMovies = getQueue();
  const ite = item;
  const newArray = removeItem(ite, parsedMovies);
  putQueue(newArray);
}
