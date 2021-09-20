import refs from './refs';

const isHidden = 'is-hidden';

refs.openModalBtnFooter.addEventListener('click', openModalBtnHandler);
refs.closeModalBtn.addEventListener('click', closeModalBtnHandler);

function openModalBtnHandler(e) {
  e.preventDefault();
  refs.modalFooter.classList.remove(isHidden);
  document.body.classList.add('no-scroll');
}

function closeModalBtnHandler() {
  refs.modalFooter.classList.add(isHidden);
  document.body.classList.remove('no-scroll');
}
////////////////////////////press Esc to close/////////////////

window.addEventListener('keydown', onKeyPress);

function onKeyPress(e) {
  if (e.code === 'Escape') {
    refs.modalFooter.classList.add(isHidden);
  }
  document.body.classList.remove('no-scroll');
}
///////////////////////click out of modal to close////////////////////////////

refs.modalFooter.addEventListener('click', onMouseClick);

function onMouseClick(e) {
  const backdrop = e.target;

  if (backdrop === refs.modalFooter) {
    refs.modalFooter.classList.add(isHidden);
  }
  document.body.classList.remove('no-scroll');
}

////////////////////spiner////////////////////////////////////
