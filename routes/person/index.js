/**
 * Poster Server v0.1.0
 *
 * A Light-weight ExpressJS REST server for Poster app, it consumes TMDb public APIs.
 *
 * Author: Kushal Pandya <kushalspandya@gmail.com> (https://doublslash.com)
 * Date: 11 June, 2015
 *
 * /api/person end-points.
 */

var router = require('express').Router();

// @GET
// Gets Person Information for a personId available.
router.get('/:personId', function(req, res) {
    var tmdb = require('moviedb')(req.app.locals.tmdbApiKey);

    tmdb.personInfo(
        {
            id: req.params.personId
        },
        function(err, tmdbRes) {
            if (err)
                res.send(err);

            res.json(tmdbRes);
        }
    );
});

module.exports = router;
