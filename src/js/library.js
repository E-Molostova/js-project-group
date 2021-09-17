import { getWatched, getQueue } from './modalMovie';
import refs from './refs';
import makeMoviesMarkup from '../templates/movieList.hbs';
import { paginationUnvisible } from './header_js';
import makeDummy from '../templates/dummy.hbs';
export { lib };

function lib() {
  let array = getWatched();
  //   let array = [];

  console.log(array);
  renderLibraryContent(array);
}

function renderLibraryContent(array) {
  let markup = '';

  if (array.length === 0) {
    markup = makeDummy();
    refs.galleryList.innerHTML = markup;
    paginationUnvisible();
    console.log('in if', markup);
  } else {
    markup = makeMoviesMarkup(array);
    console.log('after if', markup);
    refs.galleryList.innerHTML = markup;
  }
  if (array.length <= 21) {
    paginationUnvisible();
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
  //   let array = [];

  // console.log(array);
  renderLibraryContent(array);
}

// let dummy = makeDummy();

// function renderDummy() {
//   refs.galleryList.innerHTML = dummy;
// }

// // console.log('dummy:', dummy);

// // refs.galleryList.innerHTML = dummy;
