import NewApiServise from './api-servise';
import refs from './refs';
import watchTrailer from './onClickWatchTrailer';
import imgPlaceholder from '/src/images/movie-time.jpg';

refs.mainList.addEventListener('click', onMovieCLick);

const filmData = []; //
let filmId = 0; // стоврив пустий об'єкт для данних про фільм

export function onMovieCLick(event) {
  refs.modalFilmInfoRef.innerHTML = '';
  const isCard = event.target.closest('.movieCard');
  if (!isCard) {
    return;
  }
  const movieId = isCard.getAttribute('data');
  // console.log(movieId);
  filmId = movieId;
  openModal();

  moviesByID(movieId);

  document.addEventListener('keydown', onEscClose);
  document.addEventListener('click', onClickClose);
}

const newsApiServise = new NewApiServise();

export function moviesByID(movieID) {
  newsApiServise.getMoviesByID(movieID).then(data => {
    createModalFilmInfoMarkup(data);
    onMoviesInfo(data); // прокидую в функцію данні про фільм
  });
}

function openModal() {
  refs.backdropFilmRef.classList.remove('is-hidden');
  refs.modalFilmInfoRef.classList.remove('is-hidden');
  refs.body.classList.add('no-scroll');
}

function createModalFilmInfoMarkup({
  title,
  popularity,
  original_title,
  vote_average,
  genres,
  poster_path,
  overview,
  vote_count,
  id,
}) {
  const base_url = 'https://image.tmdb.org/t/p/';
  const size = 'w500';
  const genresList = genres.map(genre => genre.name).join(', ');
  refs.modalFilmInfoRef.innerHTML = `<button class="modal__btn-close">
     <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="currentColor"
        class="modal__icon-close"
        viewBox="0 0 16 16"
      >
        <path
          d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
        />
      </svg>
    </button>
  <div class="modal-film__img">
      <div class="modal-film__poster">
      <img
        src="${
          poster_path ? `${base_url}${size}${poster_path}` : imgPlaceholder
        }"
        alt="${title}"
        class="modal-film__poster"
        loading="lazy" 
      />
      </div>

    <div class='modal__trailer-wrapper'>
      <button class='modal__trailer-btn js-trailer-btn'
      type='button'
      data-id='${id}'
      data-name='${original_title}'>
      watch trailer
      </button>
    </div> 

    </div>
    <div class="modal-film__description">
    <h2 class="modal-film__title">${title}</h2>
    <table class="modal-film__table">
      <tr class="modal-film__table-row">
        <td class="modal-film__table-description">Vote / Votes</td>
        <td class="modal-film__table-value">
          <span class="modal-film__table-vote">${vote_average}</span
          ><span class="modal-film__table-slash"> / </span
          ><span class="modal-film__table-votes">${vote_count}</span>
        </td>
      </tr>
      <tr class="modal-film__table-row">
        <td class="modal-film__table-description">Popularity</td>
        <td class="modal-film__table-value popularity-value">${popularity}</td>
      </tr>
      <tr class="modal-film__table-row">
        <td class="modal-film__table-description">Original Title</td>
        <td class="modal-film__table-value">${original_title}</td>
      </tr>
      <tr class="modal-film__table-row">
        <td class="modal-film__table-description">Genre</td>
        <td class="modal-film__table-value">${genresList}</td>
      </tr>
    </table>
    <h3 class="modal-film__about">About</h3>
    <p class="modal-film__abot-text">${overview}
    </p>
    <ul class="modal-film__container-btn">
      <li>
        <button class="modal-btn modal-film_btn-watched" type="submit">add to watched</button>
      </li>
      <li>
        <button class="modal-btn modal-film_btn-queue" type="submit">add to queue</button>
      </li>
    </ul>
    </div>
</div>
</div>`;

  //trailer
  const trailerBtn = document.querySelector('.js-trailer-btn');
  trailerBtn.addEventListener('click', getMovieTrailerByIdName);
}

function onEscClose(event) {
  if (event.key === 'Escape') {
    closeModal();
    onCloseTrailer();
  }
}

function onClickClose(event) {
  if (
    event.target.classList.contains('modal-film__backdrop') ||
    event.target.classList.contains('modal__btn-close') ||
    event.target.classList.contains('modal__icon-close')
  ) {
    closeModal();
  }
}

function closeModal() {
  refs.backdropFilmRef.classList.add('is-hidden');
  refs.modalFilmInfoRef.classList.add('is-hidden');
  refs.body.classList.remove('no-scroll');
  document.removeEventListener('click', onClickClose);
  document.removeEventListener('keydown', onEscClose);
}

function getMovieTrailerByIdName(e) {
  const id = e.target.dataset.id;
  const name = e.target.dataset.name;
  new watchTrailer(id, name).showTrailer();
}

function onCloseTrailer() {
  const watchTrailerLightbox = document.querySelector('.basicLightbox');
  watchTrailerLightbox.remove();
}
export function onMoviesInfo(data) {
  // роблю деструктуризацію назви фільму з об'єкту данних, тобі треба достати всі данні що треба для рендеру про фільм
  // console.log(title);
  filmData.push(data); // записую назву фільму в пустий об'єкт
}

export { filmId, filmData };
