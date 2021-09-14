import ApiService from "./api-service";
import modalMovieMarkup from '../templates/modalMovie.hbs';

const refs = {
    modalMovieWindow: document.querySelector('[data-modal-movie]'),
    modalContent: document.querySelector('.modal-wraper'),
    backdrop: document.querySelector('.backdrop'),
    modalWindowOpener: document.querySelector('[data-modal-movie-open]'),
    modalMovieWindowClsBtn: document.querySelector('[data-modal-movie-close]'),
    watchedBtn: document.querySelector('[data-modal-movie-watchedBtn]'),
    queueBtn: document.querySelector('[data-modal-movie-queueBtn]'),
}
// console.log(refs.modalMovieWindow);
// console.log(refs.modalMovieWindowClsBtn);

refs.backdrop.addEventListener('click', closeModalBackdropClick)

function preventAction(evt) {
    evt.preventDefault()
}

function showModal() {
    refs.backdrop.classList.remove('is-hidden');
    window.addEventListener('keydown', closeModalEsc);
}

function closeModal() {
    refs.backdrop.classList.add('is-hidden');
    window.removeEventListener('keydown', closeModalEsc);
}

function clearModalContent() {
    refs.modalContent.innerHTML = '';
}

function closeModalBackdropClick(evt) {
    if (evt.currentTarget === evt.target) {
        closeModal();
    }
    return
}

function closeModalEsc(evt) {
    if (evt.code === 'Escape') {
        closeModal();
    }
    return;
}