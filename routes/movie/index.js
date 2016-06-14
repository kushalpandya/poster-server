/**
 * Poster Server v0.1.0
 *
 * A Light-weight ExpressJS REST server for Poster app, it consumes TMDb public APIs.
 *
 * Author: Kushal Pandya <kushalspandya@gmail.com> (https://doublslash.com)
 * Date: 11 June, 2015
 *
 * /api/movie end-points.
 */

var router = require('express').Router();

// @GET
// Gets Movie Information for a movieId available.
router.get('/:movieId', function(req, res) {
    var tmdb = require('moviedb')(req.app.locals.tmdbApiKey);

    tmdb.movieInfo(
        {
            id: req.params.movieId
        },
        function(err, tmdbRes) {
            if (err)
                res.send(err);

            res.json(tmdbRes);
        }
    );
});

// @GET
// Gets List of Movies Currently Playing in Theaters.
router.get('/popular', function(req, res) {
    var tmdb = require('moviedb')(req.app.locals.tmdbApiKey);

    tmdb.miscPopularMovies({}, function(err, tmdbRes) {
        if (err)
            res.send(err);

        res.json(tmdbRes);
    });
});

// @GET
// Gets List of Top 20 Highest Rated Movies.
router.get('/top_rated', function(req, res) {
    var tmdb = require('moviedb')(req.app.locals.tmdbApiKey);

    tmdb.miscTopRatedMovies(function(err, tmdbRes) {
        if (err)
            res.send(err);

        res.json(tmdbRes);
    });
});

// @GET
// Gets List of Upcoming Movies.
router.get('/upcoming', function(req, res) {
    var tmdb = require('moviedb')(req.app.locals.tmdbApiKey);

    tmdb.miscUpcomingMovies(function(err, tmdbRes) {
        if (err)
            res.send(err);

        res.json(tmdbRes);
    });
});

module.exports = router;
