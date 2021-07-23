const router = require('express').Router();
const auth = require('../middlewares/auth');
const movies = require('./movies');
const { usersRouter, signinRouter, signupRouter } = require('./users');

router.use('/signin', signinRouter);
router.use('/signup', signupRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', movies);

module.exports = router;
