const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({
        token,
      });
    })
    .catch((err) => {
      err.statusCode = 401;
      err.message = '401 — Переданы некорректные данные при поиске пользователя';
      next(err);
    });
};

module.exports.signup = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        err.statusCode = 409;
        err.message = '409 — Указанный пользователь уже существует.';
      }
      else {
        err.statusCode = 400;
        err.message = '400 — Переданы некорректные данные при заведении пользователя';
      }
      next(err);
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        const error = new Error('404 — Пользователь с указанным _id не найден.');
        error.statusCode = 404;
        next(error);
      }
      else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      err.statusCode = 400;
      err.message = '400 — Переданы некорректные данные при поиске пользователя';
      next(err);
    });
};

module.exports.setUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true })
    .then((user) => {
      if (!user) {
        const error = new Error('404 — Пользователь с указанным _id не найден.');
        error.statusCode = 404;
        next(error);
      }
      else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      err.statusCode = 400;
      err.message = '400 — Переданы некорректные данные при обновлении профиля.';
      next(err);
    });
};
