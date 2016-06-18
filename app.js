/**
 * Poster Server v0.1.0
 *
 * A Light-weight ExpressJS REST server for Poster app, it consumes TMDb public APIs.
 *
 * Author: Kushal Pandya <kushalspandya@gmail.com> (https://doublslash.com)
 * Date: 11 June, 2015
 *
 * Poster App Main Script.
 */

/*
 * Load Configurations and Utilities.
 */
var stringTemplate = require('string-template'),
    configuration = require('./configuration.json');

/*
 * Load Modules.
 */
var express = require('express'),
    morgan = require('morgan'),
    cors = require('cors');

/*
 * Intialize App Server.
 */
var posterApp = express();

posterApp.locals.tmdbApiKey = configuration.poster.tmdbApiKey;
posterApp.locals.tmdbMoviePosterURL = configuration.poster.tmdbMoviePosterURL;
posterApp.locals.tmdbMovieBackdropURL = configuration.poster.tmdbMovieBackdropURL;
posterApp.locals.tmdbProfileURL = configuration.poster.tmdbProfileURL;
posterApp.use(morgan(configuration.morgan.logType));
posterApp.use(cors());
posterApp.use('/api', require('./routes'));

module.exports = posterApp;
