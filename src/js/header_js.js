import refs from './refs';
import { preparingData, getTrendingMovies } from './gallery';
import api from './api-service';
import makeMoviesMarkup from '../templates/movieList.hbs';
import { resPagination, getTotalNumberForPaginationSearch } from './gallery';
import { getTotalNumberForPagination } from './gallery';
import { lib, renderLibraryContent } from './library';

export { getMoviesByValue, spinerStyleToggle, paginationVisible, paginationUnvisible };

refs.pageHome.addEventListener('click', onPageHome);
refs.siteLogoList.addEventListener('click', onPageHome);
refs.pageLibrary.addEventListener('click', onPageLibrary);
refs.searchForm.addEventListener('submit', onSearch);

const headerIsHidden = 'header-is-hidden';

function onPageHome(e) {
  e.preventDefault();
  getTotalNumberForPagination();
  smthOk();
  clearGalleryList();
  paginationVisible();
  getTrendingMovies();
  refs.searchForm.reset();

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
  refs.searchContainer.classList.toggle(headerIsHidden);
  refs.btnHome.classList.toggle(headerIsHidden);
  refs.btnLibrary.classList.toggle(headerIsHidden);
  refs.pageHome.classList.toggle('current');
  refs.pageLibrary.classList.toggle('current');
}

function smthWrong() {
  refs.smthWrong.classList.remove(headerIsHidden);
  renderLibraryContent([]);
}

function smthOk() {
  refs.smthWrong.classList.add(headerIsHidden);
}


function onSearch(e) {
  e.preventDefault();
  smthOk();
  spinerStyleToggle();
  api.resetPage();
  paginationVisible();
  const input = refs.searchForm.elements.search.value;
  getMoviesByValue(input);
  getTotalNumberForPaginationSearch();
}


function getMoviesByValue(input) {
  api.q = input;
  api
    .fetchQuery()
    .then(data => {
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


function renderModalContent({ results }) {
  const normilizedResults = results.map(movie => preparingData(movie));
  const markup = makeMoviesMarkup(normilizedResults);
  refs.galleryList.innerHTML = markup;
}

function clearGalleryList() {
  api.query = '';
  api.resetPage();
  resPagination();
  refs.galleryList.innerHTML = '';
}

function spinerStyleToggle() {
  refs.searchSvg.classList.toggle(headerIsHidden);
  refs.searchSpin.classList.toggle(headerIsHidden);
}

function paginationUnvisible() {
  refs.pagination.classList.add(headerIsHidden);
}

function paginationVisible() {
  refs.pagination.classList.remove(headerIsHidden);
}

refs.searchForm.addEventListener('input', onClearError);

function onClearError(e) {
  smthOk();
}
