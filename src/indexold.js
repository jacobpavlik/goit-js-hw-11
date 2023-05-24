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
  console.log(
    'Yes, you clicked submit button, and now write something useful!'
  );
  console.log(input.value);
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
    console.log(response);
    [response].forEach((images, i) => {
      const imageTemplate = `<div class="photo-card">
      <img src="${images.data.hits.webformatURL}" alt="${images.data.hits.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <p>${images.data.hits.likes}</p>
        </p>
        <p class="info-item">
          <b>Views</b>
          <p>${images.data.hits.views}</p>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <p>${images.data.hits.comments}</p>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <p>${images.data.hits.downloads}</p>
        </p>
      </div>
    </div>`;

      console.log(images.data.hits[i]);
      console.log(images.data.hits[i].webformatURL);
      console.log(images.data.hits[i].tags);
      console.log(images.data.hits[i].likes);
      console.log(images.data.hits[i].views);
      console.log(images.data.hits[i].comments);
      console.log(images.data.hits[i].downloads);
      console.log(images.data.hits[0]);
      console.log(images.data.hits[0].webformatURL);
      console.log(images.data.hits[0].tags);
      console.log(images.data.hits[0].likes);
      console.log(images.data.hits[0].views);
      console.log(images.data.hits[0].comments);
      console.log(images.data.hits[0].downloads);

      let totalHits = images.data.totalHits;
      console.log(images.data.totalHits);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    });
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

input.addEventListener('submit', whenSubmit);
submitBtn.addEventListener('click', whenSubmit);
