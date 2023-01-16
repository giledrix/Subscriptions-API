const membersWSDAL = require('../DAL/membersWSDAL');
const MemberModel = require('../models/membersModel');
const membersBL = require('../BL/membersBL');

const moviesWSDAL = require('../DAL/moviesWSDAL');
const MoviesModel = require('../models/moviesModel');
const moviesBL = require('../BL/moviesBL');

async function createMembersCollection() {
    let memberCollection = await membersBL.getAllMembers();

    if (memberCollection.length < 1) {
        let respFromUsersWS;
        let allMembersArr;

        try {
            // get all members from WS using DAL
            respFromUsersWS = await membersWSDAL.getAllMembers();
            allMembersArr = respFromUsersWS.data;
        }
        catch (err) {
            console.log("Load all users from WS is failed , " + err);
        }


        if (allMembersArr) {
            allMembersArr.forEach(user => {

            
                const newUser = new MemberModel({ // Create new object of member Model
                    Name: user.name,
                    Email: user.email,
                    City: user.address.city
                });

                (newUser);



                newUser.save(function (err) { // Built-in save function that came with the model
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log("Member added to collections");
                    }
                });
            });
        }
        else {
            console.log("Pulling from WS is Failed");
        }

    }
    else {
        console.log("Members collection is already initialize from WS");
    }
}

async function createMoviesCollection() {

    let moviesCollection = await moviesBL.getAllMovies();

    if (moviesCollection.length < 1) {
        let respFromMoviesWS;
        let allMoviesArr;

        try {
            // get all members from WS using DAL
            respFromMoviesWS = await moviesWSDAL.getAllMoviesFromWebService();
            allMoviesArr = respFromMoviesWS.data;
        }
        catch (err) {
            console.log("Load all movies from WS is failed , " + err);
        }

        if (allMoviesArr) {
            allMoviesArr.forEach(movie => {

                const newUser = new MoviesModel({ // Create object of movies model
                    Name: movie.name,
                    Genres: movie.genres,
                    Image: movie.image.medium,
                    Premiered: movie.premiered
                });

                newUser.save(function (err) { // Built-in save function that came with the model
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log("Movie added to collections");
                    }
                });
            });
        }
        else {
            console.log("Pulling from WS is Failed");
        }

    }
    else {
        console.log("Movies collection is already initialize from WS ");
    }
}

createMembersCollection();

createMoviesCollection();