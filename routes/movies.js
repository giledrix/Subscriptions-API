const { response } = require('express');
const express = require('express');
const router = express.Router();
const moviesBL = require('../BL/moviesBL');

const CurrentUser = require('../Utils/CurrentUser');
const jwt = require('jsonwebtoken');
const RSA_PRIVATE_KEY = 'secretkey';


router.route('/')
    .get(CurrentUser.checkToken, async function (req, resp) {

        // check if token is valid 
        // CurrentUser.verifyUserToken(req, resp);
        const token = req.headers['x-access-token'];
        if (!token)
            return resp.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
            if (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    resp.status(200).send({ auth: false, message: 'jwt TokenExpiredError' });
                }
                else {
                    resp.status(500).send({ auth: false, message: 'Failed to authenticate token' });
                }
            }
            else {
                let movies = await moviesBL.getAllMovies();
                resp.status(200).send({ auth: true, message: 'User is verified', movies });
            }
        });



    });

router.route('/:id')
    .get(CurrentUser.checkToken, async function (req, resp) { // get specific movie
        // check if token is valid 
        // CurrentUser.verifyUserToken(req, resp);

        const token = req.headers['x-access-token'];
        if (!token)
            return resp.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
            if (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    resp.status(200).send({ auth: false, message: 'jwt TokenExpiredError' });
                }
                else {
                    resp.status(500).send({ auth: false, message: 'Failed to authenticate token' });
                }
            }
            else {
                let movie = await moviesBL.getMovie(req.params.id); // get the id from url(master details)
                return resp.json(movie);// return the response as json
            }
        });


    });

router.route('/')
    .post(CurrentUser.checkToken, async function (req, resp) {  // Create new movie
        // check if token is valid 
        // CurrentUser.verifyUserToken(req, resp);

        const token = req.headers['x-access-token'];
        if (!token)
            return resp.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
            if (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    resp.status(200).send({ auth: false, message: 'jwt TokenExpiredError' });
                }
                else {
                    resp.status(500).send({ auth: false, message: 'Failed to authenticate token' });
                }
            }
            else {
                // get data from body 
                let obj = req.body;

                let status = await moviesBL.addMovie(obj); //return status
                return resp.json(status); // return the response as json
            }
        });

    });

router.route('/:id')
    .put(CurrentUser.checkToken, async function (req, resp) {// Update movie
        // check if token is valid 
        // CurrentUser.verifyUserToken(req, resp);

        const token = req.headers['x-access-token'];
        if (!token)
            return resp.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
            if (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    resp.status(200).send({ auth: false, message: 'jwt TokenExpiredError' });
                }
                else {
                    resp.status(500).send({ auth: false, message: 'Failed to authenticate token' });
                }
            }
            else {
                let obj = req.body;
                let id = req.params.id; // get the id from url(master details)

                let status = await moviesBL.updateMovie(id, obj);
                return resp.json(status);// return the response as json
            }
        });


    });

router.route('/:id')
    .delete(CurrentUser.checkToken, async function (req, resp) { // Delete Movie
        // check if token is valid 
        // CurrentUser.verifyUserToken(req, resp);

        const token = req.headers['x-access-token'];
        if (!token)
            return resp.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
            if (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    resp.status(200).send({ auth: false, message: 'jwt TokenExpiredError' });
                }
                else {
                    resp.status(500).send({ auth: false, message: 'Failed to authenticate token' });
                }
            }
            else {
                let id = req.params.id;// get the id from url(master details)

                let status = await moviesBL.deleteMovie(id);
                return resp.json(status);
            }
        });

    });


module.exports = router;