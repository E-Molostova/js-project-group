const refsH = {
  pageHome: document.querySelector('#home'),
  pageLibrary: document.querySelector('#library'),
  headerContainer: document.querySelector('.header-container'),
  siteLogoList: document.querySelector('.site-logo-list'),
  searchContainer: document.querySelector('.search-form'),
  searchForm: document.querySelector('.search'),
  smthWrong: document.querySelector('.smth-wrong-container'),
  btnHome: document.querySelector('#home-btn'),
  btnLibrary: document.querySelector('#library-btn'),
};

refsH.pageHome.addEventListener('click', onPageHome);
refsH.siteLogoList.addEventListener('click', onPageHome);
refsH.pageLibrary.addEventListener('click', onPageLibrary);

function onPageHome(e) {
  e.preventDefault();
  if (refsH.pageHome.classList.contains('current')) {
    return;
  }
  updateBgImg();
  changePage();
}

function onPageLibrary(e) {
  e.preventDefault();
  if (refsH.pageLibrary.classList.contains('current')) {
    return;
  }
  updateBgImg();
  changePage();
}

function updateBgImg() {
  refsH.headerContainer.classList.toggle('header-main-bg');
  refsH.headerContainer.classList.toggle('header-secondary-bg');
}

function changePage() {
  refsH.searchContainer.classList.toggle('header-is-hidden');
  refsH.btnHome.classList.toggle('header-is-hidden');
  refsH.btnLibrary.classList.toggle('header-is-hidden');
  refsH.pageHome.classList.toggle('current');
  refsH.pageLibrary.classList.toggle('current');
}

function smthWrong() {
  refsH.smthWrong.classList.toggle('header-is-hidden');
}
