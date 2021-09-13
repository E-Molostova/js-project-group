export default class ApiService {
  #API_KEY = '43599aecc4a107996f3426684f8b9f50';
  BASE_URL = 'https://api.themoviedb.org/3';

  constructor() {
    this.page = 1;
    this.query = '';
    this.id = 0;
  }

  fetchTrending() {
    // https://api.themoviedb.org/3/trending/movie/week
    // https://api.themoviedb.org/3/movie/550?api_key=43599aecc4a107996f3426684f8b9f50
    // https://api.themoviedb.org/3/search/movie?api_key=43599aecc4a107996f3426684f8b9f50&language=en-US&query=war%20of%20nations&page=1&include_adult=false&region=ukraine&year=2021

    const trendingParams = new URLSearchParams({
      api_key: this.#API_KEY,
      page: this.page,
    });

    return fetch(`${this.BASE_URL}/trending/movie/week?${trendingParams}`).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Something went wrong');
    });
  }

  fetchQuery() {
    const queryParams = new URLSearchParams({
      api_key: this.#API_KEY,
      page: this.page,
      query: this.query,
      include_adult: false,
      region: ukraine,
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
    const queryParams = new URLSearchParams({
      api_key: this.#API_KEY,
    });

    return fetch(`${this.BASE_URL}/movie/${this.id}?${queryParams}`).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Something went wrong');
    });
  }

  set query(qValue) {
    this.query = qValue.split(' ').join('%20');
  }

  set id(idValue) {
    this.id = Number(idValue);
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
