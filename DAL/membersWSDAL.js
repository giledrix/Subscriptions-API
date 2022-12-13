const axios = require('axios');

exports.getAllMembers = function () {
    return axios.get("https://jsonplaceholder.typicode.com/users"); // return all users json as promise
}