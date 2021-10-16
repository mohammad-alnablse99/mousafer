const { catchAsync } = require('utils');
const validator = require('./validator');
const handler = require('./handler');
const router = require('express').Router();
const passport = require('./passport');

/****************************
 * @Router /api/public/auth *
 ****************************/
router.post('/login', validator.login, passport.authenticate('login', { session: false }), catchAsync(handler.login));

module.exports = router;
