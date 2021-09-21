class ApiService {
  #API_KEY = '43599aecc4a107996f3426684f8b9f50';
  BASE_URL = 'https://api.themoviedb.org/3';

  constructor() {
    this.page = 1;
    this.query = '';
    this.id = 0;
  }
  fetchGenres() {
    const genresParams = new URLSearchParams({
      api_key: this.#API_KEY,
    });

    return fetch(`${this.BASE_URL}/genre/movie/list?${genresParams}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Something went wrong');
      })
      .catch(error => {
        console.log(error.message);
      });
  }
  // ttps://api.themoviedb.org/3/genre/movie/list?api_key=43599aecc4a107996f3426684f8b9f50&language=en-US
  fetchTrending() {
    const trendingParams = new URLSearchParams({
      api_key: this.#API_KEY,
      page: this.page,
    });

    return fetch(`${this.BASE_URL}/trending/movie/week?${trendingParams}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Something went wrong');
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  fetchQuery() {
    const queryParams = new URLSearchParams({
      api_key: this.#API_KEY,
      page: this.page,
      query: this.query,
      include_adult: false,
      year: 2021,
    });

    return fetch(`${this.BASE_URL}/search/movie?${queryParams}`).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Something went wrong');
    });
  }

  fetchMovieById() {
    const idParams = new URLSearchParams({
      api_key: this.#API_KEY,
    });

    return fetch(`${this.BASE_URL}/movie/${this.id}?${idParams}`).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Something went wrong');
    });
  }

  set q(qValue) {
    this.query = qValue.split(' ').join('+');
  }

  set movId(idValue) {
    this.id = Number(idValue);
  }

  set galleryPage(pageValue) {
    this.page = Number(pageValue);
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
// https://api.themoviedb.org/3/trending/movie/week
// https://api.themoviedb.org/3/movie/550?api_key=43599aecc4a107996f3426684f8b9f50
// https://api.themoviedb.org/3/search/movie?api_key=43599aecc4a107996f3426684f8b9f50&language=en-US&query=war%20of%20nations&page=1&include_adult=false&region=ukraine&year=2021
const api = new ApiService();
export default api;
