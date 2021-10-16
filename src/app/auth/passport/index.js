const passport = require('passport');
const localStrategy = require('./strategies/local');
const jwtAdminStrategy = require('./strategies/jwtAdmin');

passport.use('login', localStrategy);
passport.use('jwtAdmin', jwtAdminStrategy);

module.exports = passport;
