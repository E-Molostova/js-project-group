import team from '../templates/modal-footer-team.hbs';
import facebook from '../images/svg-footer/facebook.svg';
import instagram from '../images/svg-footer/instagram.svg';
import linkedin from '../images/svg-footer/linkedin.svg';
import twitter from '../images/svg-footer/twitter.svg';
import closebtn from '../images/svg-footer/close.svg';
import Alex from '../images/team/Alex.jpg';
import Elena from '../images/team/Elena.jpg';
import Vlad from '../images/team/Vlad.jpg';
import Slava from '../images/team/Slava.jpg';
import Artem from '../images/team/Artem.jpg';
import Andrei from '../images/team/Andrei.jpg';
import refs from './refs';

const obj = {
  facebook,
  instagram,
  twitter,
  linkedin,
  closebtn,
  Alex,
  Elena,
  Vlad,
  Slava,
  Artem,
  Andrei,
};

// document.querySelector('.footer-text-link').onclick = () => {

//   basicLightbox.create(team(obj)).show();
// };

// const closebtn = document.querySelector('[data-modal-close]');
// const modalFooter = document.querySelector('[data-modal]');

// closebtn.addEventListener('click, onClosebtnClick');

// function onClosebtnClick() {
//   modalFooter.classList.active('is-hidden');
// }

console.log(refs.modalFooter);
refs.openModalBtnFooter.addEventListener('click', openModalBtnHandler);

function openModalBtnHandler() {
  refs.modalFooter.classList.remove('is-hidden');
  refs.modalFooter.innerHTML = team(obj);
  refs.closeModalBtn = document.querySelector('.js-modal-footer__close-btn');
  refs.closeModalBtn.addEventListener('click', closeModalBtnHandler);
}

function closeModalBtnHandler() {
  refs.modalFooter.classList.add('is-hidden');
}
