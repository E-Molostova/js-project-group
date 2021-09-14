import refs from "./refs"

refs.pageHome.addEventListener('click', onPageHome);
refs.siteLogoList.addEventListener('click', onPageHome);
refs.pageLibrary.addEventListener('click', onPageLibrary);

function onPageHome(e) {
  e.preventDefault();
  if (refs.pageHome.classList.contains('current')) {
    return;
  }
  updateBgImg();
  changePage();
}

function onPageLibrary(e) {
  e.preventDefault();
  if (refs.pageLibrary.classList.contains('current')) {
    return;
  }
  updateBgImg();
  changePage();
}

function updateBgImg() {
  refs.headerContainer.classList.toggle('header-main-bg');
  refs.headerContainer.classList.toggle('header-secondary-bg');
}

function changePage() {
  refs.searchContainer.classList.toggle('header-is-hidden');
  refs.btnHome.classList.toggle('header-is-hidden');
  refs.btnLibrary.classList.toggle('header-is-hidden');
  refs.pageHome.classList.toggle('current');
  refs.pageLibrary.classList.toggle('current');
}

function smthWrong() {
  refs.smthWrong.classList.toggle('header-is-hidden');
}
