import axios from 'axios';

const instance = axios.create({
    // the cloud function url(The Api url)
    baseURL:"http://localhost:5001/clone-challenge-528a1/us-central1/api" 

})

export default instance;