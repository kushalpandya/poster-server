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

var router = require('express').Router(),
    tmdbImages = require('../../middleware/tmdbimages'),
    sanitizeQuery = require('../../middleware/sanitizequery');

// @GET
// Gets Movie Information for a movieId available.
router.get('/info/:movieId', function(req, res) {
    var tmdb = require('moviedb')(req.app.locals.tmdbApiKey);

    tmdb.movieInfo(
        {
            id: req.params.movieId
        },
        function(err, tmdbRes) {
            if (err)
                res.send(err);

            tmdbImages({
                root: tmdbRes,
                posterPrefix: req.app.locals.tmdbMoviePosterURL,
                backdropPrefix: req.app.locals.tmdbMovieBackdropURL
            });

            res.json(tmdbRes);
        }
    );
});

// @GET
// Gets List of Movies Currently Playing in Theaters.
router.get('/popular', function(req, res) {
    var tmdb = require('moviedb')(req.app.locals.tmdbApiKey);

    tmdb.miscPopularMovies(function(err, tmdbRes) {
        if (err)
            res.send(err);

        tmdbImages({
            root: tmdbRes.results,
            posterPrefix: req.app.locals.tmdbMoviePosterURL,
            backdropPrefix: req.app.locals.tmdbMovieBackdropURL
        });

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

        tmdbImages({
            root: tmdbRes.results,
            posterPrefix: req.app.locals.tmdbMoviePosterURL,
            backdropPrefix: req.app.locals.tmdbMovieBackdropURL
        });

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

        tmdbImages({
            root: tmdbRes.results,
            posterPrefix: req.app.locals.tmdbMoviePosterURL,
            backdropPrefix: req.app.locals.tmdbMovieBackdropURL
        });

        res.json(tmdbRes);
    });
});


// @GET
// Gets List of Movies Currently Playing in Theaters.
router.get('/genres', function(req, res) {
    var tmdb = require('moviedb')(req.app.locals.tmdbApiKey);

    tmdb.genreList(function(err, tmdbRes) {
        if (err)
            res.send(err);

        res.json(tmdbRes);
    });
});

// Use sanitizeQuery middleware to perform query param sanitization
router.use('/search', sanitizeQuery());

// @GET
// Gets List of Movies matching search query.
router.get('/search', function(req, res) {
    var tmdb = require('moviedb')(req.app.locals.tmdbApiKey),
        query = req.query.query;

    tmdb.searchMovie(
        {
            query: query
        },
        function(err, tmdbRes) {
            if (err)
                res.send(err);

            tmdbImages({
                root: tmdbRes.results,
                posterPrefix: req.app.locals.tmdbMoviePosterURL,
                backdropPrefix: req.app.locals.tmdbMovieBackdropURL
            });

            res.json(tmdbRes);
        }
    );
});

module.exports = router;
