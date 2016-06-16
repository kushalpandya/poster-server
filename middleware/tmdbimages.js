/**
 * Poster Server v0.1.0
 *
 * A Light-weight ExpressJS REST server for Poster app, it consumes TMDb public APIs.
 *
 * Author: Kushal Pandya <kushalspandya@gmail.com> (https://doublslash.com)
 * Date: 11 June, 2015
 *
 * Middleware to Prefix Perma-links of Images in Movie items provided by TMDb.
 */

'use strict';

module.exports = function(options) {
    var objRoot = (options && options.root) || null,
        posterPrefix = (options && options.posterPrefix) || null,
        backdropPrefix = (options && options.backdropPrefix) || null,
        processURLs;

    /**
     * This method overrides 'poster_path' & 'backdrop_path' properties
     * in movie Object to a map with perma-links to small, medium & orignal images.
     */
    processURLs = function(movieObj) {
        var newPosterPath = {},
            newBackdropPath = {},
            size;

        for (size in posterPrefix)
            newPosterPath[size] = `${posterPrefix[size]}${movieObj.poster_path}`;

        for (size in backdropPrefix)
            newBackdropPath[size] = `${backdropPrefix[size]}${movieObj.backdrop_path}`;

        movieObj.poster_path = newPosterPath;
        movieObj.backdrop_path = newBackdropPath;
    };

    // Verify if it is a valid object.
    if (typeof objRoot !== "object")
        throw new TypeError("Invalid value for options.root");

    if (Array.isArray(objRoot))
    {
        // Iterate over results list and process URLs.
        objRoot.map(function(movie, i) {
            processURLs(movie);
        });
    }
    else
        processURLs(objRoot);
};
