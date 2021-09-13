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
fetch();
