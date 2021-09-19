import api from './api-service';
import makeMoviesMarkup from '../templates/movieList.hbs';
import refs from './refs';
import pagination from 'tui-pagination';
import emptyImg from '../images/not_found.jpg';
import { getMoviesByValue, spinerStyleToggle, paginationUnvisible } from './header_js';
import { renderLibraryContent, getQueue, getWatched } from './library';
export { getTotalNumberForPaginationSearch, paginate, resPagination, getTotalNumberForPagination };

let genres = [];
const fetchGenres = () => {
  api.fetchGenres().then(data => {
    getTrendingMovies();
    return saveGenresList(data);
  });
};
const saveGenresList = data => {
  genres = [...data.genres];
};

fetchGenres();

export { api, preparingData, getTrendingMovies };

const getTrendingMovies = () => {
  api
    .fetchTrending()
    .then(data => {
      renderMovies(data);
    })
    .catch(err => {
      console.log(err.message);
    });
};

const renderMovies = ({ results }) => {
  const normilizedResults = results.map(movie => preparingData(movie));
  const markup = makeMoviesMarkup(normilizedResults);
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
};

function preparingData(result) {
  let releaseYear = 'Unknown';
  if (Date.parse(result.release_date)) {
    releaseYear = new Date(result.release_date).getFullYear();
  }
  const iconFullPath = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
  const poster = result.poster_path ? iconFullPath : emptyImg;
  let genresNames = '';
  if (result.genre_ids) {
    genresNames = result.genre_ids.map(id => genres.find(x => x.id === id).name).join(', ');
  } else {
    genresNames = result.genres.map(genre => genre.name).join(', ');
  }
  return {
    ...result,
    release_date: releaseYear,
    poster_path: poster,
    genres: genresNames,
  };
}

//---------------------- Lets pagination begin--------------------------------------

const container = document.getElementById('tui-pagination-container');

const options = {
  itemsPerPage: 20,
  visiblePages: 7,
  page: 0,
  centerAlign: true,
};

const getTotalNumberForPagination = function () {
  api
    .fetchTrending()
    .then(data => {
      const num = data.total_results;
      instance.reset(num);
    })
    .catch(err => {
      console.log(err.message);
    });
};

const getTotalNumberForPaginationSearch = function () {
  api
    .fetchQuery()
    .then(data => {
      const num = data.total_results;
      if (num > 21) instance.reset(num);
      else paginationUnvisible();
    })
    .catch(err => {
      console.log(err.message);
    });
};

function paginate(array, page_size, page_number) {
  if (array.length < 21) {
    paginationUnvisible();
    instance.reset(array.length);
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  } else {
    refs.pagination.classList.remove('header-is-hidden');
    instance.reset(array.length);
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }
}

function resPagination() {
  instance.reset();
}

function onSwitchPage(e) {
  api.page = e.page;
  refs.galleryList.innerHTML = '';
  if (refs.btnHome.classList.contains('active') && refs.pageLibrary.classList.contains('current')) {
    renderLibraryContent(getWatched());
  } else if (
    refs.btnLibrary.classList.contains('active') &&
    refs.pageLibrary.classList.contains('current')
  ) {
    renderLibraryContent(getQueue());
  } else if (api.query) {
    getMoviesByValue(api.query);
    spinerStyleToggle();
  } else getTrendingMovies();
  api.resetPage();
}

const instance = new pagination(container, options);

instance.on('beforeMove', onSwitchPage);
getTotalNumberForPagination();
