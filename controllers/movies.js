const Movie = require('../models/movie');

module.exports.getUserMovies = (req, res, next) => {
  Movie.findMoviesByOwner(req.user._id)
    .then((movies) => res.send({ data: movies }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Недостаточно прав.');
        error.statusCode = 403;
        next(error);
      } else {
        next(err);
      }
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
      if (err.name === 'ValidationError') {
        const error = new Error('Переданы некорректные данные при создании картины.');
        error.statusCode = 400;
        next(error);
      } else {
        next(err);
      }
    });
};

module.exports.removeUserMovie = (req, res, next) => {
  Movie.findById(req.params.movieSystemId)
    .then((movie) => {
      if (!movie) {
        const error = new Error('Картина с указанным _id не найдена.');
        error.statusCode = 404;
        next(error);
      } else if (String(movie.owner) !== String(req.user._id)) {
        const error = new Error('403 — Недостаточно прав.');
        error.statusCode = 403;
        next(error);
      } else {
        Movie.findByIdAndRemove(req.params.movieSystemId)
          .then(res.send({ data: movie }))
          .catch(() => {
            const error = new Error('Картина с указанным _id не найдена.');
            error.statusCode = 404;
            next(error);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Картина с указанным _id не найдена.');
        error.statusCode = 404;
        next(error);
      } else {
        next(err);
      }
    });
};
