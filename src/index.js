import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const axios = require('axios').default;
const input = document.querySelector('#search-form');
const submitBtn = document.querySelector('#search-form').children[1];
console.log(submitBtn);

function numberPage() {}

function whenSubmit(event) {
  event.preventDefault();
  console.log(
    'Yes, you clicked submit button, and now write something useful!'
  );
}
function ifPageIsReloaded() {}
window.addEventListener('load', ifPageIsReloaded);

async function getUserInput() {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '36681363 - b7657bef76d16cbfae88b6c43',
        q: 'input.value',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 40,
        page: numberPage,
        safesearch: true,
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

submitBtn.addEventListener('click', whenSubmit);
//przykład z paramsami axiosa
// axios
//   .get('/user', {
//     params: {
//       ID: 12345,
//     },
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });

// console.log(
//   Notiflix.Notify.failure(
//     'Sorry, there are no images matching your search query. Please try again.'
//   )
// );
// console.log(
//   Notiflix.Notify.warning(
//     "We're sorry, but you've reached the end of search results."
//   )
// );
// console.log(Notiflix.Notify.success('Hooray! We found ${totalHits} images.'));

// fetch(https://pixabay.com/api/)
// axios
//   .get('https://pixabay.com/api/')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });
