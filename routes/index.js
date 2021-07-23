const router = require('express').Router();
const movies = require('./movies');
const { usersRouter, signinRouter, signupRouter } = require('./users');

router.use('/users', usersRouter);
router.use('/movies', movies);
router.use('/signin', signinRouter);
router.use('/signup', signupRouter);

module.exports = router;
