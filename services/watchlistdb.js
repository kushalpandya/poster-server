/**
 * Poster Server v0.1.0
 *
 * A Light-weight ExpressJS REST server for Poster app, it consumes TMDb public APIs.
 *
 * Author: Kushal Pandya <kushalspandya@gmail.com> (https://doublslash.com)
 * Date: 22 June, 2015
 *
 * Watchlist Database Service (based on NeDB <https://github.com/louischatriot/nedb>)
 */

'use strict';

var Datastore = require("nedb");

var configuration = require("../configuration.json");

var WatchlistService = {
    _init: false,

    watchlistDB: null,

    init: function() {
        if (!this._init)
        {
            this.watchlistDB = new Datastore({
                filename: configuration.poster.dbPath,
                autoload: true,
                timestampData: true
            });
        }

        this._init = true;
    },

    addToWatchlist: function(movie, fnCallback) {
        var _this = this;

        if (!this._init)
            throw new Error("Database not initialized.");

        movie.watchlist = true;
        this.watchlistDB.find({ id: movie.id }, function(err, matches) {
            if (matches.length === 0)
                _this.watchlistDB.insert(movie, fnCallback);
        });
    },

    removeFromWatchlist: function(movieId, fnCallback) {
        if (!this._init)
            throw new Error("Database not initialized.");

        this.watchlistDB.remove({ id: movieId }, {}, fnCallback);
    },

    findInWatchlist: function(movieId, fnCallback) {
        if (!this._init)
            throw new Error("Database not initialized.");

        this.watchlistDB.findOne({ id: movieId }, fnCallback);
    },

    getWatchlist: function(fnCallback) {
        if (!this._init)
            throw new Error("Database not initialized.");

        this.watchlistDB.find({}).sort({ createdAt: 1 }).exec(fnCallback);
    },

    getWatchlistMovieMap: function(fnCallback) {
        if (!this._init)
            throw new Error("Database not initialized.");

        this.watchlistDB.find({}).sort({ createdAt: 1 }).exec(function(err, movies) {
            var ids = {};

            movies.forEach(function(movie) {
                ids[movie.id] = {
                    watchlist: true,
                    createdAt: movie.createdAt,
                    updatedAt: movie.updatedAt
                };
            });

            fnCallback(err, ids);
        });
    }
};

module.exports = WatchlistService;
