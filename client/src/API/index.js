import axios from 'axios';

const API = Object.create(null);

API.fetchImages = async () => {
    const response = await axios.get('https://api.unsplash.com/search/photos');
    console.log(response);
    return response.data.results;
};

export default API;