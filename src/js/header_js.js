import refs from './refs';
import { api, preparingData, getTrendingMovies } from './gallery';
import makeMoviesMarkup from '../templates/movieList.hbs';
import { resP } from './gallery';
// import pagination from 'tui-pagination';

refs.pageHome.addEventListener('click', onPageHome);
refs.siteLogoList.addEventListener('click', onPageHome);
refs.pageLibrary.addEventListener('click', onPageLibrary);
refs.searchForm.addEventListener('submit', onSearch);

function onPageHome(e) {
  e.preventDefault();
  smthOk();
  clearGalleryList();
  getTrendingMovies();
  if (refs.pageHome.classList.contains('current')) {
    return;
  }
  updateBgImg();
  changePage();
}

function onPageLibrary(e) {
  e.preventDefault();
  smthOk();
  if (refs.pageLibrary.classList.contains('current')) {
    return;
  }
  updateBgImg();
  changePage();
}

function updateBgImg() {
  refs.header.classList.toggle('header-main-bg');
  refs.header.classList.toggle('header-secondary-bg');
}

function changePage() {
  refs.searchContainer.classList.toggle('header-is-hidden');
  refs.btnHome.classList.toggle('header-is-hidden');
  refs.btnLibrary.classList.toggle('header-is-hidden');
  refs.pageHome.classList.toggle('current');
  refs.pageLibrary.classList.toggle('current');
}

function smthWrong() {
  refs.smthWrong.classList.remove('header-is-hidden');
}

function smthOk() {
  refs.smthWrong.classList.add('header-is-hidden');
}

let input = '';

function onSearch(e) {
  e.preventDefault();
  smthOk();
  input = refs.searchForm.elements.search.value;
  // console.log(input);
  getMoviesByValue();
  refs.searchForm.reset();
}

// let testData = '';

function getMoviesByValue(q) {
  api.q = input;
  // api.galleryPage = paginationPage;
  api
    .fetchQuery()
    .then(data => {
      console.log(data);
      // testData = data;
      if (data.results.length !== 0) {
        renderModalContent(data);
        return;
      }
      smthWrong();
      return;
    })
    .catch(err => {
      console.log(err.message);
    });
}

// console.log('testData:', testData);

function renderModalContent({ results }) {
  const normilizedResults = results.map(movie => preparingData(movie));
  // console.log(normilizedResults);
  const markup = makeMoviesMarkup(normilizedResults);
  refs.galleryList.innerHTML = markup;
}

function clearGalleryList() {
  api.resetPage();
  resP();
  // instance.page = 1;
  refs.galleryList.innerHTML = '';
}
