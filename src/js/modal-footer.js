// import team from '../templates/modal-footer-team.hbs';
// import footerSprite from '../images/footer-sprite.svg';
// import facebook from '../images/footer-sprite.svg#icon-facebook';
// import instagram from '../images/footer-sprite.svg#icon-instagram';
// import linkedin from '../images/footer-sprite.svg#icon-linkedin';
// import twitter from '../images/footer-sprite.svg#icon-twitter';
// import closebtn from '../images/footer-sprite.svg#icon-close';
// import Alex from '../images/team/Alex.jpg';
// import Elena from '../images/team/Elena.jpg';
// import Vlad from '../images/team/Vlad.jpg';
// import Slava from '../images/team/Slava.jpg';
// import Artem from '../images/team/Artem.jpg';
// import Andrei from '../images/team/Andrei.jpg';
// import refs from './refs';

// const obj = {
//   footerSprite,
//   Alex,
//   Elena,
//   Vlad,
//   Slava,
//   Artem,
//   Andrei,
// };

// document.querySelector('.footer-text-link').onclick = () => {

//   basicLightbox.create(team(obj)).show();
// };

// const closebtn = document.querySelector('[data-modal-close]');
// const modalFooter = document.querySelector('[data-modal]');

// closebtn.addEventListener('click, onClosebtnClick');

// function onClosebtnClick() {
//   modalFooter.classList.active('is-hidden');
// }

const refs = {
  openModalBtnFooter: document.querySelector('.js-footer-text-link'),
  closeModalBtn: document.querySelector('.js-modal-footer__close-btn'),
  modalFooter: document.querySelector('.js-backdrop-footer'),
};

refs.openModalBtnFooter.addEventListener('click', openModalBtnHandler);
refs.closeModalBtn.addEventListener('click', closeModalBtnHandler);

function openModalBtnHandler() {
  refs.modalFooter.classList.remove('is-hidden');
}

function closeModalBtnHandler() {
  refs.modalFooter.classList.add('is-hidden');
}

//  refs.modalFooter.innerHTML = team(obj);
