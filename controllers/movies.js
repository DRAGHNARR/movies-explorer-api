const Movie = require('../models/movie');

module.exports.getUserMovies = (req, res, next) => {
  Movie.findMoviesByOwner(req.user._id)
    .then((movies) => res.send({ data: movies }))
    .catch((err) => {
      err.statusCode = 400;
      err.message = '400 — Переданы некорректные данные при поиске картины.';
      next(err);
    });
};

module.exports.addUserMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;

  Movie.create({
    owner: req.user._id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      err.statusCode = 400;
      err.message = '400 — Переданы некорректные данные при создании картины.';
      next(err);
    });
};

module.exports.removeUserMovie = (req, res, next) => {
  Movie.findById(req.params.movieSystemId)
    .then((movie) => {
      if (!movie) {
        const error = new Error('404 — Картина с указанным _id не найдена.');
        error.statusCode = 404;
        next(error);
      }
      else {
        if (String(movie.owner) !== String(req.user._id)) {
          const error = new Error('403 — Недостаточно прав.');
          error.statusCode = 403;
          next(error);
        }
        else {
          Movie.findByIdAndRemove(req.params.movieSystemId)
            .then(res.send({ data: movie }))
            .catch((err) => {
              err.message = '400 — Картина с указанным _id не найдена.';
              err.statusCode = 400;
              next(err);
            });
        }
      }
    })
    .catch((err) => {
      err.message = '400 — Картина с указанным _id не найдена.';
      err.statusCode = 400;
      next(err);
    });
};
