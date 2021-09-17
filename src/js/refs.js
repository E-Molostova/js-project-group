const refs = {
  pageHome: document.querySelector('#home'),
  pageLibrary: document.querySelector('#library'),
  header: document.querySelector('.header'),
  headerContainer: document.querySelector('.header-container'),
  siteLogoList: document.querySelector('.site-logo-list'),
  searchContainer: document.querySelector('.search-form'),
  searchForm: document.querySelector('.search'),
  smthWrong: document.querySelector('.smth-wrong-container'),
  btnHome: document.querySelector('#home-btn'),
  btnLibrary: document.querySelector('#library-btn'),
  openModalBtnFooter: document.querySelector('.js-footer-text-link'),
  modalFooter: document.querySelector('.js-backdrop-footer'),
  modalMovieWindow: document.querySelector('[data-modal-movie]'),
  modalContent: document.querySelector('.modal-wraper'),
  backdrop: document.querySelector('.backdrop'),
  modalWindowOpener: document.querySelector('[data-modal-movie-open]'),
  modalMovieWindowClsBtn: document.querySelector('[data-modal-movie-close]'),
  // watchedBtn: document.querySelector('.js-modal-watched'),
  // queueBtn: document.querySelector('.js-modal-queue'),
  galleryList: document.querySelector('.js-gallery'),
  searchSvg: document.querySelector('.serach-use'),
  searchSpin: document.querySelector('.spinner'),
  pagination: document.getElementById('tui-pagination-container'),
  dummy: document.querySelector('.js-dummy'),
};

export default refs;
