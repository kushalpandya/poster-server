/**
 * Poster Server v0.1.0
 *
 * A Light-weight ExpressJS REST server for Poster app, it consumes TMDb public APIs.
 *
 * Author: Kushal Pandya <kushalspandya@gmail.com> (https://doublslash.com)
 * Date: 17 June, 2015
 *
 * Middleware to Sanitize Search Query for Movies before it hits TMDb API.
 */

'use strict';

module.exports = function() {

    /**
     * This method converts Query Params of Request Object to CGI escaped string.
     */
    var processQuery = function(req, res, next) {
        var param;

        for (param in req.query)
            req.query[param] = encodeURIComponent(req.query[param]);
            
        next();
    };

    return processQuery;
};
