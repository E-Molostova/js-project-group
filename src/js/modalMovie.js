import { api, preparingData } from './gallery';
import makeMoviesById from '../templates/modalMovie.hbs';
import refs from './refs';

const bodyRef = document.querySelector('body');
// console.log(bodyRef);

// listners
refs.galleryList.addEventListener('click', openModal);
refs.modalMovieWindowClsBtn.addEventListener('click', closeModal);
refs.backdrop.addEventListener('click', closeModalBackdropClick);

let movie = null;
async function openModal(evt) {
  let movieId = evt.target.closest('LI').id;
  console.log(movieId);
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
      console.log(data);
      renderModalContent(data);
    })
    .catch(err => {
      console.log(err.message);
    });
}

function renderModalContent(results) {
  const normilizedResult = preparingData(results);
  console.log(normilizedResult);
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
  refs.watchedBtn.innerHTML = 'Remove from watched';
  refs.watchedBtn.setAttribute('data-action', 'remove');
}
function makeRemoveFromQueueBtn() {
  refs.queueBtn.innerHTML = 'Remove from queue';
  refs.queueBtn.setAttribute('data-action', 'remove');
}
function makeAddToWatchedBtn() {
  refs.watchedBtn.innerHTML = 'Add to watched';
  refs.watchedBtn.setAttribute('data-action', 'add');
}
function makeAddToQueueBtn() {
  refs.queueBtn.innerHTML = 'Add to queue';
  refs.queueBtn.setAttribute('data-action', 'add');
}
function checkWatchedBtnStatus() {
  return refs.watchedBtn.getAttribute('data-action');
}
function checkQueueBtnStatus() {
  return refs.queueBtn.getAttribute('data-action');
}

refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
refs.queueBtn.addEventListener('click', onQueueBtnClick)

function onWatchedBtnClick() {
  const dataActionStatus = checkWatchedBtnStatus();
  console.log(dataActionStatus);
  if (dataActionStatus !== 'add') {
    makeRemoveFromWatchedBtn();
    refs.watchedBtn.classList.add('active-btn');
  }
  if (dataActionStatus === 'remove') {
    makeAddToWatchedBtn();
    refs.watchedBtn.classList.remove('active-btn');
  }
}
function onQueueBtnClick() {
  const dataActionStatus = checkQueueBtnStatus();
  console.log(dataActionStatus);
  if (dataActionStatus !== 'add') {
    makeRemoveFromQueueBtn();
    refs.queueBtn.classList.add('active-btn');
  }
  if (dataActionStatus === 'remove') {
    makeAddToQueueBtn();
    refs.queueBtn.classList.remove('active-btn');
  }
}