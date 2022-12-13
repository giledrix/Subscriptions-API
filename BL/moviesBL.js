const MoviesModel = require('../models/moviesModel');


const getAllMovies = function () {
    return new Promise((resolve, reject) => {
        MoviesModel.find({}, function (err, pers) {
            if (err) {
                reject(err);
            }
            else {
                resolve(pers);
            }
        })
    })
}

const getMovie = function (id) {
    return new Promise((resolve, reject) => {
        MoviesModel.findById(id, function (err, per) {
            if (err) {
                reject(err);
            }
            else {
                resolve(per);
            }
        })
    })
}

const addMovie = function (movie) {
    return new Promise((resolve, reject) => {
        const p = new MoviesModel({
            Name: movie.Name,
            Genres: movie.Genres,
            Image: movie.Image,
            Premiered: movie.Premiered
        });
        p.save(function (err) {
            if (err) {
                reject(err);
            }
            else {
                console.log('Movie is Created');
                resolve('Movie is Created');
            }
        })
    })
}

const updateMovie = function (id, movie) {
    return new Promise((resolve, reject) => {
        MoviesModel.findByIdAndUpdate(id,
            {
                Name: movie.Name,
                Genres: movie.Genres,
                Image: movie.Image,
                Premiered: movie.Premiered
            }, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve('Movie is Updated');
                }
            })
    })
}

const deleteMovie = function (id) {
    return new Promise((resolve, reject) => {
        MoviesModel.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve('Movie is Deleted');
            }
        })
    })
}

module.exports = { getAllMovies, getMovie, addMovie, updateMovie, deleteMovie }