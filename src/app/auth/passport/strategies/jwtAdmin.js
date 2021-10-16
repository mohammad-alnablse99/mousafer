const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../../../Models/users/User');
const { jwt } = require('configKeys');

const { Exception, errors } = require('utils');

const error = new Exception(errors.INVALID_AUTH_TOKEN);

module.exports = new Strategy(
	{
		secretOrKey: jwt.accessToken.key,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	},
	async (payload, done) => {
		User.findOne({ _id: payload.id, type: 'admin' })
			.then((doc) => (doc ? done(null, doc) : done(error)))
			.catch((err) => done(err));
	}
);
