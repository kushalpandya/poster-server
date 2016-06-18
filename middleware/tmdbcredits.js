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
    var primaryActors = credits.cast.slice(0, 4),
        crewItems = credits.crew,
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
             crewItems[i].job === "Screenplay")
             writers.push(crewItems[i]);

         if (crewItems[i].department === "Production" &&
             crewItems[i].job === "Producer")
             producers.push(crewItems[i]);
     }

     return {
         actors: primaryActors,
         directors: directors,
         writers: writers,
         producers: producers
     };
};
