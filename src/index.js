import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs, updateMarcup, addMarcup } from './js/renderMarcup';
import ApiService from './js/searchImg';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



let sumHits = 0;
let totalHits = 0;

refs.btnLoadMore.hidden = true;

const apiService = new ApiService();

refs.form.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);



async function onSearch(e) {
  e.preventDefault();
  apiService.query = e.currentTarget.elements.searchQuery.value.trim();
  if (!apiService.query) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  };
  
  apiService.resetPage();
  const cardsArray = await apiService.saerchImg();
  const cardsImgHits = cardsArray.hits
  sumHits += cardsImgHits.length;
  totalHits = cardsArray.totalHits;
  
  Notify.success(`Hooray! We found ${totalHits} images.`)
  updateMarcup(cardsImgHits);
  if(cardsImgHits.length < 40) {
    refs.btnLoadMore.hidden = true;
  }
  lightbox.refresh()
};

const lightbox = new SimpleLightbox('.gallery a', {
  animationSlide: false,
  captionsData: 'alt',
  captionDelay: 250,
});

async function onLoadMore() {
refs.btnLoadMore.disabled = true;
  const cardsArray = await apiService.saerchImg();
  const cardsImgHits = cardsArray.hits;
  console.log("cardsImgHits:", cardsImgHits)
  sumHits += cardsImgHits.length;

  addMarcup(cardsImgHits);
  lightbox.refresh()
  if (sumHits >= totalHits) {
    Notify.info("We're sorry, but you've reached the end of search results.")
    refs.btnLoadMore.hidden = true;
    return
  }
};


