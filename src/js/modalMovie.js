import ApiService from "./api-service";
import modalMovieMarkup from '../templates/modalMovie.hbs';

const refs = {
    modalMovieWindow: document.querySelector('[data-modal-movie]'),
    backdrop: document.querySelector('.backdrop'),
    modalWindowOpener: document.querySelector('[data-modal-movie-open]'),
    modalMovieWindowClsBtn: document.querySelector('[data-modal-movie-close]'),
    watchedBtn: document.querySelector('[data-modal-movie-watchedBtn]'),
    queueBtn: document.querySelector('[data-modal-movie-queueBtn]'),
}
console.log(refs.modalMovieWindow);
console.log(refs.modalMovieWindowClsBtn);