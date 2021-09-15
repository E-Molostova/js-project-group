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