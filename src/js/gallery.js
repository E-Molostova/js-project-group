import ApiService from './api-service';

const api = new ApiService();
const genres = [];
const fetch = () => {
  api.fetchGenres().then(data => {
    console.log(data);
    return saveGenresList(data);
  });
};
const saveGenresList = data => {
  genres.push(data.genres);
};
console.log(genres);
fetch();

const getTrendingMovies = () => {
  api
    .fetchTrending()
    .then(data => {
      renderMovies(data);
    })
    .catch(err => {
      console.log('error');
    });
};

const renderMovies = ({ results }) => {
  const normilizedResults = results.map(movie => {
    let releaseYear = 'Unknown';
    if (Date.parse(movie.release_date)) {
      releaseYear = new Date(movie.release_date).getFullYear();
    }
    const iconFullPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const poster = movie.poster_path ? iconFullPath : emptyImg;
    return {
      ...movie,
      release_date: releaseYear,
      poster_path: poster,
    };
    // return {
    //   title: movie.title,
    //   release_date: releaseYear,
    //   poster_path: movie.poster_path,
    // };
  });
  // const sortedData = normilizedResults.sort((a, b) => a.title.localeCompare(b.title));
  // const sortedData = normilizedResults.sort((a, b) => b.release_date - a.release_date);
  const markup = makeMoviesMarkup(normilizedResults);
  refs.output.insertAdjacentHTML('beforeend', markup);
};
// const fetch = () => {
//   api.fetchTrending().then(data => {
//     console.log(data);
//   });
// };

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
