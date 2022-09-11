export default refs = {
  searchForm: document.querySelector('#search-form'),
  mainList: document.querySelector('.movieList'),
  warningOnSearch: document.querySelector('#js-input-error'),
  modalFilmInfoRef: document.querySelector('.modal-film'),
  footerButtomEl: document.querySelector('.footer__btn'),
  backdropFooterEl: document.querySelector('.backdrop'),
  spinnerEl: document.querySelector('.backdrop-spinner'),
  backdropFilmRef: document.querySelector('.modal-film__backdrop'),
  body: document.querySelector('body'),
};

export const { modalFilmInfoRef, backdropFilmRef, body, mainList } = refs;
