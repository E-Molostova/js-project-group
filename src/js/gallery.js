import ApiService from './api-service';
import makeMoviesMarkup from '../templates/movieList.hbs';
// import makeMoviesById from '../templates/modalMovie.hbs';
import refs from './refs';
import pagination from 'tui-pagination';
import emptyImg from '../images/not_found.jpg';
import { getMoviesByValue, spinerStyleToggle } from './header_js';
// import Handlebars from 'handlebars';
export { getTotalNumberForPaginationSearch };
export { resPagination };

const api = new ApiService();
let genres = [];
const fetchGenres = () => {
  api.fetchGenres().then(data => {
    // console.log(data);
    getTrendingMovies();
    return saveGenresList(data);
  });
};
const saveGenresList = data => {
  genres = [...data.genres];
};
// console.log(genres);
fetchGenres();
// export default api;
export { api, preparingData, getTrendingMovies };

const getTrendingMovies = () => {
  api
    .fetchTrending()
    .then(data => {
      // console.log(data);
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
  // console.log(result);
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

// const fetchTr = () => {
//   api.fetchTrending().then(data => {
//     console.log(data);
//   });
// };
// fetchTr();

// const fetch = () => {
//   api.q = 'war';
//   api.fetchQuery().then(data => {
//     console.log(data);
//   });
// };

// const fetch = () => {
//   api.movid = 55;
//   api.fetchMovieById().then(data => {
//     console.log(data);
//   });
// };

//---------------------- Lets pagination begin--------------------------------------

const container = document.getElementById('tui-pagination-container');

const options = {
  totalItems: 0,
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
  console.log('begin');
  api
    .fetchQuery()
    .then(data => {
      const num = data.total_results;
      instance.reset(num);
    })
    .catch(err => {
      console.log(err.message);
    });
};

function onSwitchPage(e) {
  console.log('switch' + e.page);
  api.page = e.page;
  refs.galleryList.innerHTML = '';
  if (api.query) {
    getMoviesByValue(api.query);
    spinerStyleToggle();
  } else getTrendingMovies();
}

const instance = new pagination(container, options);

instance.on('beforeMove', onSwitchPage);
getTotalNumberForPagination();
export { getTotalNumberForPagination };

function resPagination() {
  instance.reset();
}
