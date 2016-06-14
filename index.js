/**
 * Poster Server v0.1.0
 *
 * A Light-weight ExpressJS REST server for Poster app, it consumes TMDb public APIs.
 *
 * Author: Kushal Pandya <kushalspandya@gmail.com> (https://doublslash.com)
 * Date: 11 June, 2015
 *
 * Poster Server Script.
 */

var os = require("os");

var configuration = require('./configuration.json');

var posterApp = require('./app');

posterApp.listen(process.env.PORT || configuration.poster.httpPort, function() {
    console.info(
        "Poster Server started at http://%s:%d at %s",
        os.hostname(),
        process.env.PORT || configuration.poster.httpPort,
        new Date()
    );
});
