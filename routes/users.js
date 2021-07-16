const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUserInfo, setUserInfo } = require('../controllers/users');

router.get('/', getUserInfo);
router.patch('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
  }).unknown(true),
}), setUserInfo);

module.exports = router;
