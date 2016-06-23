/**
 * Poster Server v0.1.0
 *
 * A Light-weight ExpressJS REST server for Poster app, it consumes TMDb public APIs.
 *
 * Author: Kushal Pandya <kushalspandya@gmail.com> (https://doublslash.com)
 * Date: 11 June, 2015
 *
 * Poster REST Routes.
 */

var posterApp = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    router;

router = posterApp.Router();
router.use(bodyParser.urlencoded({ 'extended': 'true' }));
router.use(bodyParser.json());
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));
router.use(methodOverride());

router.use('/movie', require('./movie'));
router.use('/watchlist', require('./watchlist'));

module.exports = router;
