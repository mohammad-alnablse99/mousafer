const User = require('../../../Models/users/User');
const Strategy = require('passport-local').Strategy;

const { Exception, errors } = require('utils');

const error = new Exception(errors.INVALID_EMAIL_OR_PASSWORD);

module.exports = new Strategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
	User.findOne({ email }, ['email', 'password'])
		.then(async (doc) => {
			if (!doc) return done(error);
			if ((await doc.verifyPassword(password)) !== true) return done(error);
			done(null, doc);
		})
		.catch((err) => done(err));
});
