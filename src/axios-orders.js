import axios from 'axios';

const axiosOrdersInstance = axios.create({
    baseURL: 'https://burgerbuilder-4d43f.firebaseio.com/'
});

export default axiosOrdersInstance;