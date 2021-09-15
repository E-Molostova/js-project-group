import api from './gallery';
import makeMoviesById from '../templates/modalMovie.hbs';
import refs from './refs';

// listners
refs.galleryList.addEventListener('click', openModal);
refs.modalMovieWindowClsBtn.addEventListener('click', closeModal);
refs.backdrop.addEventListener('click', closeModalBackdropClick);

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

const getMoviesById = () => {
  api.movId = 385128;
  api
    .fetchMovieById()
    .then(data => {
      console.log(data);
      rendermodal(data);
    })
    .catch(err => {
      console.log(err.message);
    });
};

const rendermodal = results => {
  const normilizedResult = preparingData(results);

  console.log(normilizedResult);
  const markup = makeMoviesById(normilizedResult);
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
};

function preparingData(result) {
  console.log(result);
  let releaseYear = 'Unknown';
  if (Date.parse(result.release_date)) {
    releaseYear = new Date(result.release_date).getFullYear();
  }
  const iconFullPath = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
  const poster = result.poster_path ? iconFullPath : emptyImg;
  // console.log(genres);
  // console.log(movie.genre_ids);
  const genresNames = result.genres.map(genre => genre.name).join(', ');
  return {
    ...result,
    release_date: releaseYear,
    poster_path: poster,
    genres: genresNames,
  };
}
getMoviesById();
