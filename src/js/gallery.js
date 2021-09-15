import ApiService from './api-service';
import makeMoviesMarkup from '../templates/movieList.hbs';
import makeMoviesById from '../templates/modalMovie.hbs';
import refs from './refs';

const api = new ApiService();
let genres = [];
const fetch = () => {
  api.fetchGenres().then(data => {
    console.log(data);
    // getTrendingMovies();
    return saveGenresList(data);
  });
};
const saveGenresList = data => {
  genres = [...data.genres];
};
console.log(genres);
fetch();

// const getTrendingMovies = () => {
//   api
//     .fetchTrending()
//     .then(data => {
//       // console.log(data);
//       renderMovies(data);
//     })
//     .catch(err => {
//       console.log(err.message);
//     });
// };

// const renderMovies = ({ results }) => {
//   const normilizedResults = results.map(movie => {
//     let releaseYear = 'Unknown';
//     if (Date.parse(movie.release_date)) {
//       releaseYear = new Date(movie.release_date).getFullYear();
//     }
//     const iconFullPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
//     const poster = movie.poster_path ? iconFullPath : emptyImg;
//     // console.log(genres);
//     // console.log(movie.genre_ids);
//     const genresNames = movie.genre_ids.map(id => genres.find(x => x.id === id).name).join(', ');
//     return {
//       ...movie,
//       release_date: releaseYear,
//       poster_path: poster,
//       genres: genresNames,
//     };
//   });
//   console.log(normilizedResults);
//   // console.log(makeMoviesMarkup);
//   const markup = makeMoviesMarkup(normilizedResults);
//   refs.galleryList.insertAdjacentHTML('beforeend', markup);
//   // refs.galleryList.innerHTML = markup;
// };

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
