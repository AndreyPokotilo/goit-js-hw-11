import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more')
};

function makeMarcup (hits) {
    const marcup = hits.map(({
    webformatURL, 
    largeImageURL, 
    tags, 
    likes, 
    views, 
    comments, 
    downloads}) => 
     `<div class="photo-card">
     <a class="gallery-link" href="${largeImageURL}">
     <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
     </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${likes}
      </p>
      <p class="info-item">
        <b>Views</b>${views}
      </p>
      <p class="info-item">
        <b>Comments</b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${downloads}
      </p>
    </div>
  </div>`
  )
  .join('')
  return marcup;
}

function updateMarcup(hits) {  
    refs.gallery.innerHTML = makeMarcup(hits);
    refs.btnLoadMore.hidden = false;
};


function addMarcup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', makeMarcup(hits))
  refs.btnLoadMore.disabled = false;
};

export {refs, updateMarcup, addMarcup};