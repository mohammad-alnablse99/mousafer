const JWT = require('jsonwebtoken');
const { jwt } = require('configKeys');
const { Exception } = require('utils');

class Auth {
	static async login(user) {
		const accessToken = JWT.sign({ id: user.id }, jwt.accessToken.key, {
			expiresIn: jwt.accessToken.expirationDuration,
		});
		const refreshToken = JWT.sign({ id: user.id }, jwt.refreshToken.key, {
			expiresIn: jwt.refreshToken.expirationDuration,
		});
		return { data: { accessToken, refreshToken } };
	}
}

module.exports = Auth;
