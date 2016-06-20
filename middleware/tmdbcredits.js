/**
 * Poster Server v0.1.0
 *
 * A Light-weight ExpressJS REST server for Poster app, it consumes TMDb public APIs.
 *
 * Author: Kushal Pandya <kushalspandya@gmail.com> (https://doublslash.com)
 * Date: 19 June, 2015
 *
 * Middleware to Process Movie Credits and find key perople information about movie.
 */

'use strict';

module.exports = function(credits) {
    var crewItems = credits.crew,
        actors = credits.cast.slice(0, 4),
        directors = [],
        writers = [],
        producers = [];

    /*
     * Iterate over Crew array from Credits and collect following members;
     * Director(s)
     * Writer(s)
     * Producer(s)
     */
     for (let i = 0; i < crewItems.length; i++)
     {
         if (crewItems[i].department === "Directing" &&
             crewItems[i].job === "Director")
             directors.push(crewItems[i]);

         if (crewItems[i].department === "Writing" &&
             (crewItems[i].job === "Screenplay" || crewItems[i].job === "Novel" || crewItems[i].job === "Writer"))
             writers.push(crewItems[i]);

         if (crewItems[i].department === "Production" &&
             crewItems[i].job === "Producer")
             producers.push(crewItems[i]);
     }

     return {
         actors: actors,
         directors: directors,
         writers: writers,
         producers: producers
     };
};
