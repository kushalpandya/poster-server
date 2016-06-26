Poster Server
======================

A Light-weight ExpressJS REST server for [Poster](https://github.com/kushalpandya/poster) app, it consumes TMDb public APIs.

###Just a server ?
Poster Server is created as a REST API provider for my small React experiment called [Poster](https://github.com/kushalpandya/poster) (check the original project to know more).  The purpose of Poster Server is following:

- Provide data from [The Movie DB](https://www.themoviedb.org/) (TMDb), it mainly uses [MovieDB](https://github.com/impronunciable/moviedb/) module to access TMDb APIs (API key required).
- Ability to preserve _Watchlist_ of movies that user adds. It uses [NeDB](https://github.com/louischatriot/nedb) to keep Watchlist data.
- It does **NOT** serve the Poster client webapp itself, you'll need to run client app separately.


###Usage
Download the tarball and extract it or clone the repo, and run `npm install` to build the project and then `npm start` to start server. There's also a `configuration.json` file which includes several server settings.

### Configuration Options
Provided `configuration.json` has two properties; `poster` and `morgan`, you can ignore `morgan` unless you're debugging server logs, `poster` has following options.

- `httpPort`: The HTTP Port at which Poster Server listens for incoming REST requests.
- `tmdbApiKey`: API key generated using your TMDb Account (you need to create one if you don't have it).
- `dbPath`: Path of NeDB file which will save Watchlisted movies to keep it persistent across sessions.
- `tmdbMoviePosterURL`: This map keeps prefix of Movie Poster images path hosted on TMDb, don't change it unless there's a change on TMDb side.
- `tmdbMovieBackdropURL`: Same as above, for movie backdrops.
- `tmdbProfileURL`: Same as above, for Person Profile images.

###REST end-points
All end-points provided by Poster Server start at `http://hostname:<port>/api`. Response JSON structure for every end-point is same as sent by TMDb (unless stated otherwise) with modifications to Image URLs for Movie Poster, Backdrop and Person Profile images. Server has CORS enabled by default.

#### `/movie`

- `GET /top_rated`: Gets list of 20 top rated movies.
- `GET /upcoming`: Gets list of 20 upcoming movies.
- `GET /popular`: Gets list of 20 popular movies.
- `GET /info/:movieId`: Gets detailed information about a movie for a provided Movie ID.
- `GET /genres`: Gets list of all possible Genres.
- `GET /search?query=`: Gets matching search results (Movie names) for value of param `query`.

#### `/watchlist`

- `GET /`: Gets list of Watchlisted movies.
- `PUT /`: Adds a movie to Watchlist. Request body needs to be Movie object JSON as received from Poster Server.
- `DELETE /:movieId`: Deletes a movie from Watchlist for a provided Movie ID.

###Author
---
[Kushal Pandya](https://doublslash.com)
