const axios = require('axios');

const apiInstance = axios.create({
    // baseURL: 'https://sabhi-task.com/',
    baseURL: 'http://localhost:12345/',
});

module.exports = {
    apiInstance
}