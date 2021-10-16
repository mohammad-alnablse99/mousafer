const _ = require('lodash');
const { httpStatus, responseSender } = require('utils');
const Auth = require('./service');

module.exports = {
	login: async (req, res) => {
		const { user } = req;
		const result = await Auth.login(user);
		responseSender(res, { responseData: result });
	},
};
