import ApiService from './api-service';
import modalMovieMarkup from '../templates/modalMovie.hbs';
import refs from './refs';


// listners
refs.galleryList.addEventListener('click', openModal)
refs.modalMovieWindowClsBtn.addEventListener('click', closeModal)
refs.backdrop.addEventListener('click', closeModalBackdropClick)



function openModal(evt) {
  let movieId = evt.target.closest('LI').id;
  console.log(movieId);
  refs.modalMovieWindow.classList.remove('is-hidden');
  window.addEventListener('keydown', closeModalEsc);
}

function preventAction(evt) {
  evt.preventDefault();
}

function clearModalContent() {
  refs.modalContent.innerHTML = '';
}

// close modal fn
function closeModal() {
  refs.backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', closeModalEsc);
  
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
