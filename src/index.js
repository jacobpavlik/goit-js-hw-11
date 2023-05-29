import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const axios = require('axios').default;
const input = document.querySelector('#search-form').children[0];
const submitBtn = document.querySelector('#search-form').children[1];
let numberPage = 1;

function whenSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  numberPage = 1;
  getUserInput();
  return input.value;
}

async function getUserInput() {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '36681363-b7657bef76d16cbfae88b6c43',
        q: `${input.value}`,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 40,
        page: numberPage,
        safesearch: true,
      },
    });
    const photos = response.data.hits;
    photos.forEach(photo => {
      const imageTemplate = `<div class="photo-card">
      <div class="photo-card__container">
      <a class="photo-card__image" href="${photo.largeImageURL}">
        <img class="photo-card__thumb" src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" /></a></div>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${photo.likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${photo.views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${photo.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${photo.downloads}
        </p>
      </div>
    </div>`;
      gallery.insertAdjacentHTML('beforeend', imageTemplate);
    });
    lightbox.refresh();
    let totalHits = response.data.totalHits;
    if (totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (numberPage === 1) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
    if (photos.length === 0) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
  } catch (error) {
    // console.error(`catch(error)`, error);
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

async function scrollHandler() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 1) {
    Notiflix.Notify.info('Loading more photos...');
    numberPage = numberPage + 1;
    await getUserInput();
  }
  // console.log('jak nie ma dołu strony - czyli scrollowanie');
}

window.addEventListener('scroll', scrollHandler);

const gallery = document.querySelector('.gallery');

input.addEventListener('submit', whenSubmit);
submitBtn.addEventListener('click', whenSubmit);
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
