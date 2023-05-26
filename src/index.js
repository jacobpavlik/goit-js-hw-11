import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const axios = require('axios').default;
const input = document.querySelector('#search-form').children[0];
const submitBtn = document.querySelector('#search-form').children[1];
console.log(submitBtn);
console.log(input);
function numberPage() {
  let numberPage = 1;
}

function whenSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  getUserInput();
  return input.value;
}
// function inputHandler() {
//   console.log(input.value);
// }
// nie jestem przekonany, że będę tego potrzebował
// function ifPageIsReloaded() {}
// window.addEventListener('load', ifPageIsReloaded);

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
    console.log(`const photos`, photos);
    console.log(`const photos[0]`, photos[0]);
    photos.forEach(photo => {
      console.log(`photos po forEach-image`, photo);
      const imageTemplate = `<div class="photo-card">
        <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" /></a>
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
      console.log(`gallery`, gallery);
      gallery.insertAdjacentHTML('beforeend', imageTemplate);

      let totalHits = response.data.totalHits;
      console.log(response.data.totalHits);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    });

    // POCZĄTEK forEach - działa średnio
    //   [response].forEach((images, i) => {
    //     const imageTemplate = `<div class="photo-card">
    //   <a href="${images.data.hits[i].largeImageURL}">
    //   <img src="${images.data.hits[i].webformatURL}" alt="${images.data.hits[i].tags}" loading="lazy" /></a>
    //   <div class="info">
    //     <p class="info-item">
    //       <b>Likes</b>
    //       ${images.data.hits[i].likes}
    //     </p>
    //     <p class="info-item">
    //       <b>Views</b>
    //       ${images.data.hits[i].views}
    //     </p>
    //     <p class="info-item">
    //       <b>Comments</b>
    //       ${images.data.hits[i].comments}
    //     </p>
    //     <p class="info-item">
    //       <b>Downloads</b>
    //       ${images.data.hits[i].downloads}
    //     </p>
    //   </div>
    // </div>`;
    //     // const gallery = document.querySelector('.gallery');
    //     console.log(`gallery`, gallery);
    //     gallery.insertAdjacentHTML('beforeend', imageTemplate);
    //     console.log(gallery);
    //     console.log(images.data.hits[i]);
    //     console.log(images.data.hits[i].webformatURL);
    //     console.log(images.data.hits[i].tags);
    //     console.log(images.data.hits[i].likes);
    //     console.log(images.data.hits[i].views);
    //     console.log(images.data.hits[i].comments);
    //     console.log(images.data.hits[i].downloads);
    //     console.log(images.data.hits[0]);
    //     console.log(images.data.hits[0].webformatURL);
    //     console.log(images.data.hits[0].tags);
    //     console.log(images.data.hits[0].likes);
    //     console.log(images.data.hits[0].views);
    //     console.log(images.data.hits[0].comments);
    //     console.log(images.data.hits[0].downloads);

    // let totalHits = images.data.totalHits;
    // console.log(images.data.totalHits);
    // Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    //   });
    //^^^ KONIEC forEach - działa średnio
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });
// function selectImage() {
//   lightbox.on();
// }

const gallery = document.querySelector('.gallery');
// gallery.addEventListener('click', selectImage);

input.addEventListener('submit', whenSubmit);
submitBtn.addEventListener('click', whenSubmit);
