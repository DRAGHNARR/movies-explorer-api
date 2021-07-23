const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getUserInfo,
  setUserInfo,
  signin,
  signup,
} = require('../controllers/users');

const usersRouter = express.Router();
const signinRouter = express.Router();
const signupRouter = express.Router();

usersRouter.get('/me', getUserInfo);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }).unknown(true),
}), setUserInfo);

signinRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), signin);

signupRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), signup);

module.exports.usersRouter = usersRouter;
module.exports.signinRouter = signinRouter;
module.exports.signupRouter = signupRouter;
