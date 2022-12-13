const axios = require('axios');

exports.getAllMoviesFromWebService = function () {
    return axios.get("https://api.tvmaze.com/shows?page=0"); // return all movies json as promise
}