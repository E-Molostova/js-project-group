import { getWatched, getQueue } from './modalMovie';
import refs from './refs';
import makeMoviesMarkup from '../templates/movieList.hbs';
import { paginationUnvisible } from './header_js';
import makeDummy from '../templates/dummy.hbs';
import api from './api-service';
import { paginate } from './gallery';
export { lib, getQueue, renderLibraryContent, getWatched, onLibWatchBtn, onLibQueueBtn };

function lib() {
  refs.btnHome.classList.add('active');
  refs.btnLibrary.classList.remove('active');
  let array = getWatched();

  console.log(array);
  renderLibraryContent(array);
}

function renderLibraryContent(array) {
  let markup = '';

  if (array.length === 0) {
    markup = makeDummy();
    refs.galleryList.innerHTML = markup;
    paginationUnvisible();
    const arrayP = paginate(array, 20, api.page);
    console.log('in if', markup);
  } else {
    const arrayP = paginate(array, 20, api.page);
    markup = makeMoviesMarkup(arrayP);
    // console.log('after if', markup);
    refs.galleryList.innerHTML = markup;
  }
}

refs.btnHome.addEventListener('click', onLibWatchBtn);
refs.btnLibrary.addEventListener('click', onLibQueueBtn);

function onLibWatchBtn(e) {
  lib();
  refs.btnHome.classList.add('active');
  refs.btnLibrary.classList.remove('active');
}

function onLibQueueBtn(e) {
  que();
  refs.btnLibrary.classList.add('active');
  refs.btnHome.classList.remove('active');
}

function que() {
  let array = getQueue();
  renderLibraryContent(array);
}
