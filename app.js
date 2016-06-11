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
    morgan = require('morgan');

/*
 * Init App Modules
 */
var posterRoutes = require('./routes/poster'),
    posterApp;

/*
 * Intialize App Server.
 */
posterApp = express();

posterApp.use(morgan(configuration.morgan.logType));
posterApp.use('/api', posterRoutes);

module.exports = posterApp;
