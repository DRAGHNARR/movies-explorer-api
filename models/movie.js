const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const regex = /\d{4}/i;
        return regex.test(v);
      },
    },
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const regex = /(https*\:\/\/(www\.){0,1})[\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=a-z0-9]*|(www\.[\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=a-z0-9]*)/i;
        return regex.test(v);
      },
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const regex = /(https*\:\/\/(www\.){0,1})[\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=a-z0-9]*|(www\.[\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=a-z0-9]*)/i;
        return regex.test(v);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const regex = /(https*\:\/\/(www\.){0,1})[\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=a-z0-9]*|(www\.[\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=a-z0-9]*)/i;
        return regex.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

movieSchema.statics.findMoviesByOwner = function (owner) {
  return this.find({ owner })
    .then((movies) => {
      if (!movies) {
        return [];
      }

      return movies;
    });
};

module.exports = mongoose.model('movie', movieSchema);
