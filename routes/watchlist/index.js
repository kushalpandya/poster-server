/**
 * Poster Server v0.1.0
 *
 * A Light-weight ExpressJS REST server for Poster app, it consumes TMDb public APIs.
 *
 * Author: Kushal Pandya <kushalspandya@gmail.com> (https://doublslash.com)
 * Date: 22 June, 2015
 *
 * /api/watchlist end-points.
 */

var router = require('express').Router();

var wdb = require('../../services/watchlistdb');

wdb.init();

// @PUT
// Adds a movie to Watchlist DB using Watchlist Service.
router.put('/', function(req, res) {
    var movie = req.body;

    wdb.addToWatchlist(movie, function(err, wdbRes) {
        if (err)
        {
            res.json({
                status: -1,
                errorMessage: "Something went wrong while adding item."
            });
        }

        res.json({
            status: 0,
            moviesAdded: wdbRes ? 1 : 0,
            movie: wdbRes
        });
    });
});

// @DELETE
// Deletes an item from the Watchlist DB using Watchlist Service.
router.get('/:movieId', function(req, res) {
    var movieId = +req.params.movieId;

    wdb.findInWatchlist(movieId, function(err, wdbRes) {
        if (err)
        {
            res.json({
                status: -1,
                errorMessage: "Something went wrong while finding item."
            });
        }

        res.json({
            status: 0,
            movie: wdbRes
        });
    });
});

// @DELETE
// Deletes an item from the Watchlist DB using Watchlist Service.
router.delete('/:movieId', function(req, res) {
    var movieId = +req.params.movieId;

    wdb.removeFromWatchlist(movieId, function(err, wdbRes) {
        if (err)
        {
            res.json({
                status: -1,
                errorMessage: "Something went wrong while removing item."
            });
        }

        res.json({
            status: 0,
            moviesRemoved: wdbRes
        });
    });
});

// @GET
// Gets all the movie in Watchlist DB.
router.get('/', function(req, res) {
    wdb.getWatchlist(function(err, wdbRes) {
        if (err)
        {
            res.json({
                status: -1,
                errorMessage: "Something went wrong while getting Watchlist."
            });
        }

        res.json({
            status: 0,
            results: wdbRes,
            total_results: wdbRes.length
        });
    });
});

module.exports = router;
