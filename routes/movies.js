const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUserMovies, addUserMovie, removeUserMovie } = require('../controllers/movies');

router.get('/', getUserMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/(https*\:\/\/(www\.){0,1})[\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=a-z0-9]*|(www\.[\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=a-z0-9]*)/i),
    trailer: Joi.string().required().regex(/(https*\:\/\/(www\.){0,1})[\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=a-z0-9]*|(www\.[\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=a-z0-9]*)/i),
    thumbnail: Joi.string().required().regex(/(https*\:\/\/(www\.){0,1})[\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=a-z0-9]*|(www\.[\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=a-z0-9]*)/i),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }).unknown(true),
}), addUserMovie);
router.delete('/:movieSystemId', celebrate({
  params: Joi.object().keys({
    movieSystemId: Joi.string().hex().required(),
  }),
}), removeUserMovie);

module.exports = router;
