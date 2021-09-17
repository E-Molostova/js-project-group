import refs from './refs';
import { api, preparingData, getTrendingMovies } from './gallery';
import makeMoviesMarkup from '../templates/movieList.hbs';
import { resPagination, getTotalNumberForPaginationSearch } from './gallery';
// import pagination from 'tui-pagination';
import { lib } from './library';

export { getMoviesByValue, spinerStyleToggle, paginationVisible, paginationUnvisible };

refs.pageHome.addEventListener('click', onPageHome);
refs.siteLogoList.addEventListener('click', onPageHome);
refs.pageLibrary.addEventListener('click', onPageLibrary);
refs.searchForm.addEventListener('submit', onSearch);

function onPageHome(e) {
  e.preventDefault();
  smthOk();
  clearGalleryList();
  paginationVisible();
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

  lib();
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
  spinerStyleToggle();
  api.resetPage();
  input = refs.searchForm.elements.search.value;
  // console.log(input);

  getMoviesByValue();
  getTotalNumberForPaginationSearch();
  refs.searchForm.reset();
}

// let testData = '';

function getMoviesByValue() {
  api.q = input;
  // api.galleryPage = paginationPage;
  api
    .fetchQuery()
    .then(data => {
      console.log(data);
      // testData = data;
      if (data.results.length !== 0) {
        renderModalContent(data);
        spinerStyleToggle();
        return;
      }
      smthWrong();
      spinerStyleToggle();
      return;
    })
    .catch(err => {
      console.log(err.message);
      spinerStyleToggle();
      smthWrong();
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
  resPagination();
  refs.galleryList.innerHTML = '';
}

function spinerStyleToggle() {
  refs.searchSvg.classList.toggle('header-is-hidden');
  refs.searchSpin.classList.toggle('header-is-hidden');
}

function paginationUnvisible() {
  refs.pagination.classList.add('header-is-hidden');
}

function paginationVisible() {
  refs.pagination.classList.remove('header-is-hidden');
}
