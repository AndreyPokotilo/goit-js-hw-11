import axios from 'axios';

export default class ApiService{
  
 #API_KEY = '34706221-9d2a051ca4e5886c5a95e61e7';
 #BASE_URL = 'https://pixabay.com/api/';

  constructor() {
    this.saerchQuery = '';
    this.page = 1;
  };
  
  async saerchImg() {
    const options = {
      mathod: 'GET',
      url: this.#BASE_URL,
      params: {
        key: this.#API_KEY,
        q: this.saerchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: this.page,
        per_page: 40}
    };
    
    try {
      const response = await axios(options)
      const images = response.data
      this.incrementPage()
      return images 
    } catch (error) {
      console.log(error)
    }

  };

  incrementPage() {
    this.page += 1;
  };

  resetPage() {
    this.page = 1;
  }

  get query() {
   return this.saerchQuery
  };

  set query(newQuery) {
    this.saerchQuery = newQuery;
  };
};



